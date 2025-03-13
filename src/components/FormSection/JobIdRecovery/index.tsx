import React, { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import styles from "./JobIdRecovery.module.scss";

interface JobIdRecoveryProps {
  onLoadResults: (jobId: string) => void;
}

/**
 * Section for recovering results using a job ID
 *
 * @param {function} onLoadResults - Callback for when load button is clicked
 */
const JobIdRecovery: React.FC<JobIdRecoveryProps> = ({ onLoadResults }) => {
  const [jobId, setJobId] = useState("");

  const handleLoadResults = () => {
    if (jobId.trim()) {
      onLoadResults(jobId.trim());
    }
  };

  return (
    <div className={styles.jobIdSection}>
      <Input
        id="jobId"
        placeholder="Enter Job ID to recover results"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
        className={styles.jobIdInput}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={handleLoadResults}
        disabled={!jobId.trim()}
      >
        Load Results
      </Button>
    </div>
  );
};

export default JobIdRecovery;
