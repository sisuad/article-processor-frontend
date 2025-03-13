import React from "react";
import Button from "../../UI/Button";
import styles from "./ApiToggle.module.scss";
import { ApiType } from "../../../types";

interface ApiToggleProps {
  activeApi: ApiType;
  onToggle: (type: ApiType) => void;
}

/**
 * Toggle buttons for switching between Standard and Custom API options
 *
 * @param {ApiType} activeApi - Currently active API type
 * @param {function} onToggle - Callback for when API type is toggled
 */
const ApiToggle: React.FC<ApiToggleProps> = ({ activeApi, onToggle }) => {
  return (
    <div className={styles.apiToggle}>
      <Button
        type="button"
        variant="secondary"
        isActive={activeApi === "standard"}
        onClick={() => onToggle("standard")}
        fullWidth
      >
        Standard API
      </Button>
      <Button
        type="button"
        variant="secondary"
        isActive={activeApi === "custom"}
        onClick={() => onToggle("custom")}
        fullWidth
      >
        Custom API
      </Button>
    </div>
  );
};

export default ApiToggle;
