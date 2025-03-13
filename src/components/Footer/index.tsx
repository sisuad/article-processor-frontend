import React from "react";
import styles from "./Footer.module.scss";

/**
 * Application footer component with copyright and GitHub link
 */
const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <small>
        © {new Date().getFullYear()} Article Processor -
        <a
          href="https://github.com/elowenluo/article-processor"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
      </small>
    </footer>
  );
};

export default Footer;
