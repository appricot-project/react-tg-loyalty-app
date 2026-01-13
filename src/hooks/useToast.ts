import { useCallback, useState } from "react";

import type { ToastMessage, ToastType } from "@/components/Toast/Toast";

export const useToast = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info", duration?: number) => {
    const id = `${Date.now()}-${Math.random()}`;
    setMessages((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return {
    messages,
    addToast,
    removeToast,
    success: (msg: string, duration?: number) => addToast(msg, "success", duration),
    error: (msg: string, duration?: number) => addToast(msg, "error", duration),
    info: (msg: string, duration?: number) => addToast(msg, "info", duration),
    warning: (msg: string, duration?: number) => addToast(msg, "warning", duration),
  };
};
