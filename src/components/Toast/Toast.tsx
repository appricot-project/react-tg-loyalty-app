import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  duration?: number;
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

const getIcon = (type: ToastType): string => {
  const icons: Record<ToastType, string> = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };

  return icons[type];
};

const getStyles = (type: ToastType): string => {
  const styles: Record<ToastType, string> = {
    success: "bg-green-50 text-green-700 border-green-500",
    error: "bg-red-50 text-red-700 border-red-500",
    info: "bg-blue-50 text-blue-700 border-blue-500",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-500",
  };

  return styles[type];
};

export const Toast = ({ messages, onRemove }: ToastProps) => {
  useEffect(() => {
    const timers = messages.map((msg) => {
      const duration = msg.duration || 4000;

      return setTimeout(() => onRemove(msg.id), duration);
    });

    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, [messages, onRemove]);

  if (messages.length === 0) return null;

  return (
    <div className="fixed bottom-21 right-5 z-50 flex flex-col gap-3 max-w-sm pointer-events-auto">
      {messages.map((msg) => (
        <div
          className={`flex items-center gap-3 p-3 rounded-lg shadow-lg text-xs font-medium animate-slideIn border-l-4 ${getStyles(msg.type)}`}
          key={msg.id}
        >
          <span className="shrink-0">{getIcon(msg.type)}</span>
          <span className="flex-1">{msg.message}</span>

          <button
            aria-label="Закрыть уведомление"
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            type="button"
            onClick={() => onRemove(msg.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
