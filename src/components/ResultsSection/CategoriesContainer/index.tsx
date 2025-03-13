import React from 'react';
import TagsContainer from '../TagsContainer';
import styles from './CategoriesContainer.module.scss';

interface CategoriesContainerProps {
  categories: string[];
  onCategoriesChange: (categories: string[]) => void;
  className?: string;
}

/**
 * Component for displaying and managing categories
 * 
 * @param {string[]} categories - Array of categories
 * @param {function} onCategoriesChange - Callback for when categories are modified
 * @param {string} className - Optional additional CSS class
 */
const CategoriesContainer: React.FC<CategoriesContainerProps> = ({ 
  categories, 
  onCategoriesChange, 
  className = '' 
}) => {
  return (
    <TagsContainer
      tags={categories}
      onTagsChange={onCategoriesChange}
      label="Categories:"
      className={`${styles.categoriesContainer} ${className}`}
    />
  );
};

export default CategoriesContainer;