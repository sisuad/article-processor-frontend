import { ApiProvider } from "../types";

/**
 * Fetch available models for a provider
 *
 * @param {ApiProvider} provider - The API provider
 * @param {string} apiKey - API key for authentication
 * @param {string} customUrl - Optional custom API URL
 * @returns {Promise<string[]>} - Promise resolving to array of model names
 */
export const fetchModels = async (
  provider: ApiProvider,
  apiKey: string,
  customUrl?: string
): Promise<string[]> => {
  try {
    let url: string;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Set up provider-specific endpoints and headers
    switch (provider) {
      case "openai":
        url = customUrl || "https://api.openai.com/v1/models";
        headers["Authorization"] = `Bearer ${apiKey}`;
        break;

      case "google":
        url =
          customUrl ||
          "https://generativelanguage.googleapis.com/v1beta/models";
        headers["x-goog-api-key"] = apiKey;
        break;

      case "claude":
        url = customUrl || "https://api.anthropic.com/v1/models";
        headers["anthropic-version"] = "2023-06-01";
        headers["x-api-key"] = apiKey;
        break;

      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `API responded with ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Extract model names based on provider response structure
    switch (provider) {
      case "openai":
        return data.data
          .filter(
            (model: any) =>
              model.id.includes("gpt") && !model.id.includes("instruct")
          )
          .map((model: any) => model.id);

      case "google":
        return data.models
          .filter((model: any) => model.name.includes("gemini"))
          .map((model: any) => model.name.split("/").pop());

      case "claude":
        return data.data.map((model: any) => model.id);

      default:
        return [];
    }
  } catch (error) {
    console.error(`Error fetching models for ${provider}:`, error);
    // Return empty array on error, we'll fall back to hardcoded values
    return [];
  }
};
