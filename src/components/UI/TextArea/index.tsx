import React from "react";
import styles from "./TextArea.module.scss";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/**
 * Reusable TextArea component with optional label and error message
 *
 * @param {string} label - Optional label text for the textarea
 * @param {string} error - Optional error message
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props - All standard textarea attributes
 */
const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`${styles.formGroup} ${className || ""}`}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`${styles.textarea} ${error ? styles.textareaError : ""}`}
        {...props}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default TextArea;
