import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FileUpload } from "@/components/FileUpload/FileUpload";
import { Toast } from "@/components/Toast/Toast";
import { useToast } from "@/hooks/useToast";
import { useAppSelector } from "@/store/hooks";
import type { Receipt } from "@/types";

export const UploadPage = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { messages, removeToast, success } = useToast();

  const handleUploadSuccess = (receipt: Receipt) => {
    success(`Чек "${receipt.fileName}" успешно загружен!`);
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="mt-4 pt-4 px-4">
      <h1 className="text-2xl font-bold text-[var(--color-gray-1000)] mb-6">Загрузка чека</h1>

      {user && (
        <div className="mb-6 p-4 rounded-2xl bg-white border border-[var(--color-gray-100)]">
          <div className="max-w-xl">
            <FileUpload onSuccess={handleUploadSuccess} />
          </div>
        </div>
      )}

      <div className="my-6 p-6 rounded-2xl bg-white border border-[var(--color-gray-100)]">
        <h2 className="text-lg font-semibold text-[var(--color-blue-800)] mb-4">
          Как это работает?
        </h2>

        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="font-bold text-[var(--color-blue-800)] shrink-0">1.</span>
            <span className="text-[var(--color-gray-400)]">Загрузите фото чека</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-[var(--color-blue-800)] shrink-0">2.</span>
            <span className="text-[var(--color-gray-400)]">
              Система автоматически обработает чек (обычно в течение нескольких минут)
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-[var(--color-blue-800)] shrink-0">3.</span>
            <span className="text-[var(--color-gray-400)]">
              Загруженные чеки можно просмотреть на странице История чеков
            </span>
          </li>
        </ol>
      </div>

      <Toast messages={messages} onRemove={removeToast} />
    </div>
  );
};
