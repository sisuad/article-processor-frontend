import React from "react";
import styles from "./Select.module.scss";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  options: SelectOption[];
  error?: string;
  onChange?: (value: string) => void;
}

/**
 * Reusable Select component with options, label and error message
 *
 * @param {string} label - Optional label text for the select
 * @param {SelectOption[]} options - Array of options for the select
 * @param {string} error - Optional error message
 * @param {function} onChange - Callback for value change
 * @param {React.SelectHTMLAttributes<HTMLSelectElement>} props - All standard select attributes
 */
const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  onChange,
  className,
  id,
  ...props
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${styles.formGroup} ${className || ""}`}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`${styles.select} ${error ? styles.selectError : ""}`}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default Select;
