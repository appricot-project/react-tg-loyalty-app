import { Modal } from "@telegram-apps/telegram-ui";
import { ReactNode, useState } from "react";

import { RECEIPT_STATUS_COLORS, RECEIPT_STATUS_LABELS } from "@/types";
import type { Receipt } from "@/types";

const getStatusBadge = (status: string) => ({
  label: RECEIPT_STATUS_LABELS[status as keyof typeof RECEIPT_STATUS_LABELS],
  color: RECEIPT_STATUS_COLORS[status as keyof typeof RECEIPT_STATUS_COLORS],
});

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const isValidImageUrl = (url: string): boolean => {
  try {
    return (
      url.startsWith("blob:") ||
      url.startsWith("http") ||
      url.startsWith("./") ||
      url.startsWith("/")
    );
  } catch {
    return false;
  }
};

interface PreviewImageProps {
  alt: string;
  fallback?: ReactNode;
  src: string;
}

const PreviewImage = ({ src, alt, fallback }: PreviewImageProps) => {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError || !isValidImageUrl(src)) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[var(--color-gray-400)]">
        {fallback || "📄"}
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setImageError(true)}
      src={src}
    />
  );
};

interface ReceiptCardProps {
  receipt: Receipt;
}

export const ReceiptCard = ({ receipt }: ReceiptCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageError, setModalImageError] = useState(false);

  const { fileName, fileSize, preview, status, uploadedAt } = receipt;

  const statusBadge = getStatusBadge(status);

  return (
    <>
      <div className="rounded-2xl bg-white border border-[var(--color-gray-100)] p-4">
        <div className="flex gap-4">
          <button
            aria-label="Просмотреть чек"
            className="shrink-0 w-24 h-24 rounded-lg bg-[var(--color-gray-50)] overflow-hidden border border-[var(--color-gray-100)] cursor-pointer hover:opacity-80 transition-opacity"
            type="button"
            onClick={() => setIsModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsModalOpen(true);
              }
            }}
          >
            <PreviewImage src={preview} alt={fileName} />
          </button>

          <div className="flex-1 min-w-0">
            <div className="space-y-2">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[var(--color-blue-800)] truncate">{fileName}</p>
                <p className="text-sm text-[var(--color-gray-400)] mt-0.5">
                  {formatDate(uploadedAt)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div
                  className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${statusBadge.color}`}
                >
                  {statusBadge.label}
                </div>
                <p className="text-xs text-[var(--color-gray-400)]">
                  {(fileSize / 1024).toFixed(0)} KB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        dismissible
        header={
          <div className="w-full">
            <div className="flex justify-center py-2">
              <div className="w-10 h-1 bg-[var(--color-gray-300)] rounded-full"></div>
            </div>
            <div className="px-4 pb-2">
              <p className="text-lg font-semibold text-[var(--color-gray-1000)]">{fileName}</p>
            </div>
          </div>
        }
        onOpenChange={setIsModalOpen}
        open={isModalOpen}
      >
        <div className="flex items-center justify-center p-4 mb-22">
          {preview && isValidImageUrl(preview) && !modalImageError ? (
            <img
              alt={fileName}
              className="max-w-full max-h-[75vh] object-contain"
              src={preview}
              onError={() => setModalImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[var(--color-gray-400)] py-8">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-sm">{fileName}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
