import React from "react";
import styles from "./Header.module.scss";

/**
 * Application header component with title and subtitle
 */
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Article Processor</h1>
      <p className={styles.subtitle}>
        Process and summarize articles with AI assistance
      </p>
    </header>
  );
};

export default Header;
