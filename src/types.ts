export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

export enum ReceiptStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export const RECEIPT_STATUS_LABELS: Record<ReceiptStatus, string> = {
  [ReceiptStatus.PENDING]: "Обрабатывается",
  [ReceiptStatus.APPROVED]: "Принят",
  [ReceiptStatus.REJECTED]: "Отклонен",
};

export const RECEIPT_STATUS_COLORS: Record<ReceiptStatus, string> = {
  [ReceiptStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [ReceiptStatus.APPROVED]: "bg-green-100 text-green-800",
  [ReceiptStatus.REJECTED]: "bg-red-100 text-red-800",
};

export interface Receipt {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  status: ReceiptStatus;
  preview: string;
  uploadedAt: number;
  userId: number;
}
