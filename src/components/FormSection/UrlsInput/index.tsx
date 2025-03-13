import React from "react";
import TextArea from "../../UI/TextArea";
import styles from "./UrlsInput.module.scss";

interface UrlsInputProps {
  urls: string;
  onChange: (urls: string) => void;
}

/**
 * Text area for entering article URLs
 *
 * @param {string} urls - URLs input string
 * @param {function} onChange - Callback for when URLs input changes
 */
const UrlsInput: React.FC<UrlsInputProps> = ({ urls, onChange }) => {
  return (
    <TextArea
      id="urls"
      label="Article URLs (one per line):"
      placeholder="https://news.mydrivers.com/1/1030/1030243.htm"
      rows={8}
      value={urls}
      onChange={(e) => onChange(e.target.value)}
      required
      className={styles.urlsInput}
    />
  );
};

export default UrlsInput;
