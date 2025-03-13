// ResultsSection/TagsContainer/index.tsx
import React, { useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./TagsContainer.module.scss";

interface TagsContainerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  label?: string;
  className?: string;
}

/**
 * Component for displaying and managing tags
 *
 * @param {string[]} tags - Array of tags
 * @param {function} onTagsChange - Callback for when tags are modified
 * @param {string} label - Optional label text
 * @param {string} className - Optional additional CSS class
 */
const TagsContainer: React.FC<TagsContainerProps> = ({
  tags,
  onTagsChange,
  label = "Tags:",
  className = "",
}) => {
  const [newTag, setNewTag] = useState("");

  const handleRemoveTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            {tag}{" "}
            <span
              className={styles.tagRemove}
              onClick={() => handleRemoveTag(index)}
            >
              ×
            </span>
          </div>
        ))}
      </div>

      <div className={styles.addTagInput}>
        <Input
          placeholder="Add new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.tagInput}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddTag}
          disabled={!newTag.trim() || tags.includes(newTag.trim())}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TagsContainer;
