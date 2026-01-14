import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { FileUpload } from "@/components/FileUpload/FileUpload";
import { Toast } from "@/components/Toast/Toast";
import { useToast } from "@/hooks/useToast";
import { useAppSelector } from "@/store/hooks";
import type { Receipt } from "@/types";

export const UploadPage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { messages, removeToast, success } = useToast();

  const handleUploadSuccess = (receipt: Receipt) => {
    success(t("upload.successWithFile", { fileName: receipt.fileName }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="mt-4 pt-4 px-4">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{t("upload.title")}</h1>

      {user && (
        <div className="mb-6 p-4 rounded-2xl bg-[var(--tg-theme-section-bg-color,#ffffff)] border border-[var(--border-color)] shadow-lg">
          <div className="max-w-xl">
            <FileUpload onSuccess={handleUploadSuccess} />
          </div>
        </div>
      )}

      <div className="my-6 p-6 rounded-2xl bg-[var(--tg-theme-section-bg-color,#ffffff)] border border-[var(--border-color)] shadow-lg">
        <h2 className="text-lg font-semibold text-[var(--text-accent)] mb-4">
          {t("upload.subtitle")}
        </h2>

        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="font-bold text-[var(--text-accent)] shrink-0">1.</span>
            <span className="text-[var(--color-gray-400)]">{t("upload.step1")}</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-[var(--text-accent)] shrink-0">2.</span>
            <span className="text-[var(--color-gray-400)]">{t("upload.step2")}</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-[var(--text-accent)] shrink-0">3.</span>
            <span className="text-[var(--color-gray-400)]">{t("upload.step3")}</span>
          </li>
        </ol>
      </div>

      <Toast messages={messages} onRemove={removeToast} />
    </div>
  );
};
