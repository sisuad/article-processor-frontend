import React from "react";
import styles from "./ErrorSection.module.scss";

interface ErrorSectionProps {
  message: string;
}

/**
 * Error message section for displaying processing errors
 *
 * @param {string} message - Error message to display
 */
const ErrorSection: React.FC<ErrorSectionProps> = ({ message }) => {
  return (
    <section className={styles.errorSection}>
      <div className={styles.errorMessage}>
        <h3>Error</h3>
        <p>
          {message ||
            "There was an error processing your request. Please check your inputs and try again."}
        </p>
      </div>
    </section>
  );
};

export default ErrorSection;
