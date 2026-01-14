import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";

import type { Receipt, ReceiptStatus } from "@/types";

import { useReceipts } from "./useReceipts";

const PAGE_SIZE = 3;
const DELAY = 300;

const fetcher = async (key: string) => {
  const page = parseInt(key.replace("receipts-page-", ""), 10);

  await new Promise((resolve) => setTimeout(resolve, DELAY));

  return { page };
};

export const useReceiptsInfinite = (filterStatus?: ReceiptStatus | "all") => {
  const loader = useRef<HTMLDivElement | null>(null);
  const { allReceipts } = useReceipts();

  const { error, size, setSize, isValidating } = useSWRInfinite(
    (index: number) => `receipts-page-${index + 1}`,
    fetcher,
  );

  const filteredReceipts =
    filterStatus && filterStatus !== "all"
      ? allReceipts.filter((receipt: Receipt) => receipt.status === filterStatus)
      : allReceipts;

  const sortedReceipts = [...filteredReceipts].sort((a, b) => b.uploadedAt - a.uploadedAt);

  const receipts = sortedReceipts.slice(0, size * PAGE_SIZE);
  const total = sortedReceipts.length;
  const hasMore = receipts.length < total;

  useEffect(() => {
    if (!hasMore) return;

    let timeout: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isValidating) {
          timeout = setTimeout(() => setSize((s) => s + 1), 150);
        }
      },
      { threshold: 1 },
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
      if (timeout) clearTimeout(timeout);
    };
  }, [hasMore, isValidating, setSize]);

  return {
    receipts,
    isLoading: isValidating && size === 1,
    hasMore,
    error: error ? "history.loadError" : null,
    loader,
  };
};
