import { useAppSelector } from "@/store/hooks";
import type { Receipt } from "@/types";

export const useReceipts = (userId?: number) => {
  const user = useAppSelector((state) => state.user.user);
  const receipts = useAppSelector((state) => state.receipts.items);
  const isLoading = useAppSelector((state) => state.receipts.isLoading);
  const error = useAppSelector((state) => state.receipts.error);

  const currentUserId = userId || user?.id;
  const userReceipts = currentUserId
    ? receipts.filter((r: Receipt) => r.userId === currentUserId)
    : [];

  return {
    receipts: userReceipts,
    allReceipts: receipts,
    isLoading,
    error: error ? "Ошибка при загрузке чеков" : null,
  };
};
