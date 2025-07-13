import React, { useEffect, useState } from "react";
import { useTheme } from "../app/hooks";

interface ToastProps {
  message: string | React.ReactNode;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      position: "fixed" as const,
      bottom: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      zIndex: 1000,
      transition: "all 0.3s ease",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(100%)",
      maxWidth: "300px",
      wordWrap: "break-word" as const,
    };

    switch (type) {
      case "success":
        return {
          ...baseStyles,
          backgroundColor: theme.primaryColor,
          color: theme.textColor,
          border: `1px solid ${theme.secondaryColor}`,
        };
      case "info":
        return {
          ...baseStyles,
          backgroundColor: theme.primaryColor,
          color: theme.textColor,
          border: `1px solid ${theme.secondaryColor}`,
        };
      case "warning":
        return {
          ...baseStyles,
          backgroundColor: theme.primaryColor,
          color: theme.textColor,
          border: `1px solid ${theme.secondaryColor}`,
        };
      case "error":
        return {
          ...baseStyles,
          backgroundColor: theme.primaryColor,
          color: theme.textColor,
          border: `1px solid ${theme.secondaryColor}`,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: theme.primaryColor,
          color: theme.textColor,
          border: `1px solid ${theme.secondaryColor}`,
        };
    }
  };

  return <div style={getToastStyles()}>{message}</div>;
};

export default Toast;
