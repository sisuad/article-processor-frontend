import React from "react";
import Button from "../../UI/Button";
import styles from "./ResultsHeader.module.scss";
import { Article } from "../../../types";

interface ResultsHeaderProps {
  articles: Article[];
  onCopyAll: () => void;
}

/**
 * Header for the results section with actions
 *
 * @param {Article[]} articles - Array of processed articles
 * @param {function} onCopyAll - Callback for when copy all button is clicked
 */
const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  articles,
  onCopyAll,
}) => {
  return (
    <div className={styles.resultsHeader}>
      <h2>Results {articles.length > 0 && `(${articles.length})`}</h2>
      {articles.length > 0 && (
        <Button variant="secondary" onClick={onCopyAll}>
          Copy All Results
        </Button>
      )}
    </div>
  );
};

export default ResultsHeader;
