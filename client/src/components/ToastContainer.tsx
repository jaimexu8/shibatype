import React, { useState, useCallback } from "react";
import Toast from "./Toast";

interface ToastMessage {
  id: string;
  message: string | React.ReactNode;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
}

interface ToastContainerProps {
  children: React.ReactNode;
}

export const ToastContext = React.createContext<{
  showToast: (
    message: string | React.ReactNode,
    type?: "success" | "info" | "warning" | "error",
    duration?: number
  ) => void;
}>({
  showToast: () => {},
});

export const ToastProvider: React.FC<ToastContainerProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (
      message: string | React.ReactNode,
      type: "success" | "info" | "warning" | "error" = "success",
      duration: number = 3000
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastMessage = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
