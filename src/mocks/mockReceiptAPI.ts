import type { Receipt } from "../types";
import { ReceiptStatus } from "../types";

const UPLOAD_DELAY = 200;

export const mockReceipts: Receipt[] = [
  {
    id: "receipt_1",
    fileName: "check_1.jpg",
    fileSize: 1024000,
    fileType: "image/jpeg",
    status: ReceiptStatus.APPROVED,
    preview: "./mockImages/receipt1.jpg",
    uploadedAt: Date.now() - 86400000,
    userId: 123,
  },
  {
    id: "receipt_2",
    fileName: "check_2.png",
    fileSize: 2048000,
    fileType: "image/png",
    status: ReceiptStatus.REJECTED,
    preview: "./mockImages/receipt2.png",
    uploadedAt: Date.now() - 172800000,
    userId: 123,
  },
  {
    id: "receipt_3",
    fileName: "check_3.jpg",
    fileSize: 1536000,
    fileType: "image/jpeg",
    status: ReceiptStatus.PENDING,
    preview: "./mockImages/receipt3.jpg",
    uploadedAt: Date.now() - 259200000,
    userId: 123,
  },
];

let receipts: Receipt[] = [...mockReceipts];

export const uploadReceipt = async (
  file: File,
  userId: number,
  onProgress?: (progress: number) => void,
): Promise<Receipt> => {
  return new Promise((resolve) => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 30;

      if (progress > 90) progress = 90;
      onProgress?.(progress);

      if (progress >= 90) {
        clearInterval(interval);

        setTimeout(() => {
          onProgress?.(100);

          const receipt: Receipt = {
            id: `receipt_${Date.now()}`,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            status: ReceiptStatus.PENDING,
            preview: URL.createObjectURL(file),
            uploadedAt: Date.now(),
            userId,
          };

          receipts.push(receipt);
          resolve(receipt);
        }, UPLOAD_DELAY);
      }
    }, 200);
  });
};

export const updateReceiptStatus = (id: string, status: ReceiptStatus): Receipt | undefined => {
  const receipt = receipts.find((r) => r.id === id);

  if (receipt) {
    receipt.status = status;
  }

  return receipt;
};

export const clearReceipts = () => {
  receipts = [...mockReceipts];
};

export const simulateStatusUpdate = (id: string, delay: number = 5000) => {
  setTimeout(() => {
    const receipt = receipts.find((r) => r.id === id);

    if (receipt && receipt.status === ReceiptStatus.PENDING) {
      const statuses: ReceiptStatus[] = [ReceiptStatus.APPROVED, ReceiptStatus.REJECTED];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      updateReceiptStatus(id, randomStatus);
    }
  }, delay);
};
