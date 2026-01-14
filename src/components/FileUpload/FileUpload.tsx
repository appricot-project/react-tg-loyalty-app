import { FileInput } from "@telegram-apps/telegram-ui";
import { useCallback, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { useTranslation } from "react-i18next";

import { uploadReceipt, simulateStatusUpdate } from "@/mocks/mockReceiptAPI";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addReceipt, setError, setLoading, setUploadProgress } from "@/store/receiptsSlice";
import type { Receipt } from "@/types";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const STATUS_UPDATE_DELAY = 5000;

interface FileUploadProps {
  onSuccess?: (receipt: Receipt) => void;
}

export const FileUpload = ({ onSuccess }: FileUploadProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { isLoading, uploadProgress, error } = useAppSelector((state) => state.receipts);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return t("upload.errorInvalidFormat");
    }

    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    if (!hasValidExtension) {
      return t("upload.errorInvalidExtension");
    }

    if (file.size > MAX_FILE_SIZE) {
      return t("upload.errorFileSizeExceeded", { size: MAX_FILE_SIZE / (1024 * 1024) });
    }

    return null;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      setSelectedFile(null);
      return;
    }

    setValidationError(null);
    setSelectedFile(file);
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      dispatch(setError(t("upload.noFile")));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      dispatch(setUploadProgress(0));

      const receipt = await uploadReceipt(selectedFile, user.id, (progress: number) => {
        dispatch(setUploadProgress(progress));
      });

      dispatch(addReceipt(receipt));
      setSelectedFile(null);
      setValidationError(null);

      simulateStatusUpdate(receipt.id, STATUS_UPDATE_DELAY);
      onSuccess?.(receipt);
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : t("upload.error")));
    } finally {
      dispatch(setLoading(false));
      dispatch(setUploadProgress(0));
    }
  }, [selectedFile, user, dispatch, onSuccess, t]);

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        setValidationError(error);
        setSelectedFile(null);
        return;
      }

      setValidationError(null);
      setSelectedFile(file);
    }
  };

  return (
    <div className="w-full">
      <button
        className={`w-full border-2 border-dashed rounded-xl p-6 text-center transition-all bg-[var(--tg-theme-section-bg-color,#ffffff)] ${
          isDragging
            ? "border-[var(--text-accent)] bg-blue-50"
            : "border-[var(--color-gray-400)] bg-[var(--color-secondary-bg)]"
        }`}
        type="button"
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!isLoading && !selectedFile && (
          <>
            <div className="text-4xl mb-3">📄</div>
            <p className="text-sm text-[var(--color-gray-400)] mb-2">{t("upload.dragOrSelect")}</p>
            <FileInput
              accept=".jpg,.jpeg,.png,.pdf"
              label={t("upload.selectFile")}
              onChange={handleFileChange}
            />
            <p className="text-xs text-[var(--color-gray-400)] mt-3">{t("upload.formats")}</p>
          </>
        )}

        {selectedFile && !isLoading && (
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl text-green-600">✓</div>
            <p className="font-medium text-[var(--color-gray-700)]">{selectedFile.name}</p>
            <p className="text-xs text-[var(--color-gray-400)]">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
            <button
              className="mt-3 bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg disabled:bg-[var(--color-gray-200)] text-sm"
              disabled={isLoading}
              type="button"
              onClick={handleUpload}
            >
              {t("upload.button")}
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-full bg-[var(--bg-primary)] rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-800 transition-all rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xl font-bold text-blue-800">{uploadProgress.toFixed(0)}%</p>
            <p className="text-xs text-[var(--color-gray-400)]">{t("upload.uploading")}</p>
          </div>
        )}
      </button>

      {validationError && (
        <div className="mt-3 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-xs rounded flex items-center gap-2">
          <span>{validationError}</span>
        </div>
      )}
      {error && (
        <div className="mt-3 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-xs rounded flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
