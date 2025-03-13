import React from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

/**
 * Loading spinner component
 *
 * @param {string} size - Size of the spinner (small, medium, large)
 */
const Spinner: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  return <div className={`${styles.spinner} ${styles[size]}`} />;
};

export default Spinner;
