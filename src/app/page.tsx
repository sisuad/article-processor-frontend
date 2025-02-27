"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  // Form state
  const [urls, setUrls] = useState("");
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [customUrl, setCustomUrl] = useState(
    "https://api.openai.com/v1/chat/completions"
  );
  const [apiKey, setApiKey] = useState("");

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editableResults, setEditableResults] = useState<any[]>([]);

  // Available models by provider
  const modelOptions: Record<string, string[]> = {
    openai: ["gpt-3.5-turbo", "gpt-4o"],
    google: ["gemini-1.5-pro", "gemini-2.0-flash"],
    custom: [
      "gpt-3.5-turbo",
      "gpt-4o",
      "gemini-1.5-pro",
      "gemini-2.0-flash",
      "custom",
    ],
  };

  // Load saved settings from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProvider = localStorage.getItem("provider");
      const savedModel = localStorage.getItem("model");
      const savedCustomUrl = localStorage.getItem("customUrl");
      const savedApiKey = localStorage.getItem("apiKey");

      if (savedProvider) setProvider(savedProvider);
      if (savedModel) setModel(savedModel);
      if (savedCustomUrl) setCustomUrl(savedCustomUrl);
      if (savedApiKey) setApiKey(savedApiKey);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("provider", provider);
      localStorage.setItem("model", model);
      localStorage.setItem("customUrl", customUrl);
      localStorage.setItem("apiKey", apiKey);
    }
  }, [provider, model, customUrl, apiKey]);

  // Poll for job status
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (jobId && isProcessing) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(`api/processStatus/${jobId}`);
          const data = await response.json();

          if (Array.isArray(data)) {
            setIsProcessing(false);
            setResults(Array.isArray(data) ? data : [data]);
            setEditableResults(Array.isArray(data) ? [...data] : [data]);
            clearInterval(intervalId);
          } else if (data.status === "failed") {
            setIsProcessing(false);
            setError(data.error || "Processing failed");
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error checking job status:", err);
          setError("Error checking job status");
          setIsProcessing(false);
          clearInterval(intervalId);
        }
      }, 3000); // Check every 3 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [jobId, isProcessing]);

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvider = e.target.value;
    setProvider(newProvider);

    // Set default model for the selected provider
    if (modelOptions[newProvider]?.length > 0) {
      setModel(modelOptions[newProvider][0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults([]);
    setEditableResults([]);
    setIsProcessing(true);

    // Parse URLs from textarea (split by newlines)
    const urlList = urls.split("\n").filter(url => url.trim() !== "");

    if (urlList.length === 0) {
      setError("Please enter at least one URL");
      setIsProcessing(false);
      return;
    }

    // Prepare API config based on selected provider
    const llmApiConfig: Record<string, string> = {
      model: model,
      apiKey: apiKey,
    };

    if (provider === "custom") {
      llmApiConfig.url = customUrl;
    }

    try {
      const response = await fetch("api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: urlList,
          llmApiConfig,
        }),
      });

      const data = await response.json();

      if (data.jobId) {
        setJobId(data.jobId);
      } else {
        setError("Invalid response from server");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Error processing articles:", err);
      setError("Error submitting request");
      setIsProcessing(false);
    }
  };

  const handleResultEdit = (index: number, field: string, value: any) => {
    const updatedResults = [...editableResults];
    updatedResults[index] = {
      ...updatedResults[index],
      [field]: value,
    };
    setEditableResults(updatedResults);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        alert("Failed to copy to clipboard");
      });
  };

  const copyResult = (index: number) => {
    const result = editableResults[index];
    const formattedResult = JSON.stringify(result, null, 2);
    copyToClipboard(formattedResult);
  };

  const copyAllResults = () => {
    const formattedResults = JSON.stringify(editableResults, null, 2);
    copyToClipboard(formattedResults);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Article Processor</h1>
        <p>Process and summarize articles with AI assistance</p>
      </header>

      <main>
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="urls">Article URLs (one per line):</label>
              <textarea
                id="urls"
                value={urls}
                onChange={e => setUrls(e.target.value)}
                placeholder="https://news.mydrivers.com/1/1030/1030243.htm"
                rows={8}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="provider">LLM Provider:</label>
                <select
                  id="provider"
                  value={provider}
                  onChange={handleProviderChange}
                >
                  <option value="openai">OpenAI</option>
                  <option value="google">Google AI Studio</option>
                  <option value="custom">Custom API</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="model">Model:</label>
                <select
                  id="model"
                  value={model}
                  onChange={e => setModel(e.target.value)}
                >
                  {modelOptions[provider]?.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {provider === "custom" && (
              <div className="form-group">
                <label htmlFor="customUrl">API URL:</label>
                <input
                  type="url"
                  id="customUrl"
                  value={customUrl}
                  onChange={e => setCustomUrl(e.target.value)}
                  placeholder="https://api.openai.com/v1/chat/completions"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="apiKey">API Key:</label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="submit-button"
            >
              {isProcessing ? "Processing..." : "Process Articles"}
            </button>
          </form>
        </section>

        {error && (
          <section className="error-section">
            <div className="error-message">
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          </section>
        )}

        {isProcessing && (
          <section className="loading-section">
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Processing articles... This may take a minute.</p>
              <p>Job ID: {jobId}</p>
            </div>
          </section>
        )}

        {editableResults.length > 0 && (
          <section className="results-section">
            <div className="results-header">
              <h2>Results</h2>
              {editableResults.length > 1 && (
                <button onClick={copyAllResults} className="copy-button">
                  Copy All
                </button>
              )}
            </div>

            {editableResults.map((result, index) => (
              <div key={index} className="result-card">
                <div className="result-header">
                  <h3>Article {index + 1}</h3>
                  <button
                    onClick={() => copyResult(index)}
                    className="copy-button"
                  >
                    Copy
                  </button>
                </div>

                <div className="result-field">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={result.title || ""}
                    onChange={e =>
                      handleResultEdit(index, "title", e.target.value)
                    }
                  />
                </div>

                <div className="result-field">
                  <label>Summary:</label>
                  <textarea
                    value={result.summary || ""}
                    onChange={e =>
                      handleResultEdit(index, "summary", e.target.value)
                    }
                    rows={4}
                  />
                </div>

                <div className="result-field">
                  <label>Tags:</label>
                  <input
                    type="text"
                    value={result.tags || ""}
                    onChange={e =>
                      handleResultEdit(index, "tags", e.target.value)
                    }
                  />
                </div>

                <div className="result-field">
                  <label>Categories:</label>
                  <input
                    type="text"
                    value={
                      Array.isArray(result.categories)
                        ? result.categories.join(", ")
                        : result.categories || ""
                    }
                    onChange={e =>
                      handleResultEdit(
                        index,
                        "categories",
                        e.target.value.split(", ")
                      )
                    }
                  />
                </div>

                <div className="result-field content-field">
                  <label>Content:</label>
                  <textarea
                    value={result.content || ""}
                    onChange={e =>
                      handleResultEdit(index, "content", e.target.value)
                    }
                    rows={8}
                  />
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      <footer>
        <small>
          © {new Date().getFullYear()} Article Processor -{" "}
          <a
            href="https://github.com/elowenluo/article-processor"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </small>
      </footer>
    </div>
  );
}
