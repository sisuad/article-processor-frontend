import React, { useState } from "react";
import Input from "../../UI/Input";
import TextArea from "../../UI/TextArea";
import TagsContainer from "../TagsContainer";
import CategoriesContainer from "../CategoriesContainer";
import styles from "./ResultCard.module.scss";
import { Article } from "../../../types";

interface ResultCardProps {
  article: Article;
  index: number;
  onDelete: () => void;
  onChange: (updatedArticle: Article) => void;
}

/**
 * Card component displaying a processed article result
 *
 * @param {Article} article - Article data
 * @param {number} index - Index of the article
 * @param {function} onDelete - Callback for when delete button is clicked
 * @param {function} onChange - Callback for when article data is modified
 */
const ResultCard: React.FC<ResultCardProps> = ({
  article,
  index,
  onDelete,
  onChange,
}) => {
  return (
    <div className={styles.resultCard}>
      <button
        className={styles.deleteResult}
        title="Delete result"
        onClick={onDelete}
      >
        ×
      </button>

      <div className={styles.resultHeader}>
        <h3>Article {index + 1}</h3>
      </div>

      <div className={styles.resultField}>
        <Input
          label="Title:"
          value={article.title}
          onChange={(e) => onChange({ ...article, title: e.target.value })}
        />
      </div>

      <div className={styles.resultField}>
        <TextArea
          label="Summary:"
          rows={4}
          value={article.summary}
          onChange={(e) => onChange({ ...article, summary: e.target.value })}
        />
      </div>

      <TagsContainer
        tags={article.tags}
        onTagsChange={(tags) => onChange({ ...article, tags })}
        className={styles.resultField}
      />

      <CategoriesContainer
        categories={article.categories}
        onCategoriesChange={(categories) =>
          onChange({ ...article, categories })
        }
        className={styles.resultField}
      />

      <div className={`${styles.resultField} ${styles.contentField}`}>
        <TextArea
          label="Content:"
          rows={8}
          value={article.content}
          onChange={(e) => onChange({ ...article, content: e.target.value })}
        />
      </div>
    </div>
  );
};

export default ResultCard;
