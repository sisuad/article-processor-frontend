import React, { useState } from "react";
import Input from "../../UI/Input";
import styles from "./ApiKeyInput.module.scss";

interface ApiKeyInputProps {
  apiKey: string;
  onChange: (apiKey: string) => void;
}

/**
 * Input for API key with visibility toggle
 *
 * @param {string} apiKey - API key value
 * @param {function} onChange - Callback for when API key changes
 */
const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onChange }) => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className={styles.apiKeyContainer}>
      <Input
        id="apiKey"
        label="API Key:"
        type={showApiKey ? "text" : "password"}
        placeholder="Enter your API key"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
        required
        className={styles.apiKeyInput}
      />
      <button
        type="button"
        className={styles.toggleVisibility}
        onClick={() => setShowApiKey(!showApiKey)}
        title={showApiKey ? "Hide API Key" : "Show API Key"}
      >
        {showApiKey ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default ApiKeyInput;
