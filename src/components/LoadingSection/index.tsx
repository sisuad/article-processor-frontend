import React from "react";
import Spinner from "../UI/Spinner";
import styles from "./LoadingSection.module.scss";

interface LoadingSectionProps {
  jobId: string;
}

/**
 * Loading indicator section shown during article processing
 *
 * @param {string} jobId - ID of the current processing job
 */
const LoadingSection: React.FC<LoadingSectionProps> = ({ jobId }) => {
  return (
    <section className={styles.loadingSection}>
      <div className={styles.loadingIndicator}>
        <Spinner size="large" />
        <p className={styles.loadingText}>
          Processing articles... This may take a minute.
        </p>
        {jobId && <p className={styles.jobId}>Job ID: {jobId}</p>}
      </div>
    </section>
  );
};

export default LoadingSection;
