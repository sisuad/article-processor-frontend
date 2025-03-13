import React from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable Button component with multiple variants
 *
 * @param {ButtonVariant} variant - Button style variant (primary, secondary, danger)
 * @param {boolean} fullWidth - Whether button should take full width
 * @param {boolean} isActive - Whether button is in active state (for toggle buttons)
 * @param {React.ReactNode} children - Button content
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - All standard button attributes
 */
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  isActive = false,
  children,
  className,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    isActive ? styles.active : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
