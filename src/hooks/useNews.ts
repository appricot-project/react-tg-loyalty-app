import { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";

import { mockNews } from "@/mocks/mockNews";

const PAGE_SIZE = 5;
const DELAY = 500;

const fetcher = async (key: string) => {
  const page = parseInt(key.replace("news-page-", ""), 10);

  await new Promise((resolve) => setTimeout(resolve, DELAY));
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const result = {
    items: mockNews.slice(start, end),
    total: mockNews.length,
  };

  return result;
};

export const useNews = () => {
  const loader = useRef<HTMLDivElement | null>(null);

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index: number) => `news-page-${index + 1}`,
    fetcher,
  );

  const news = data ? data.flatMap((d) => d.items) : [];
  const total = data && data.length > 0 ? data[0].total : 0;
  const hasMore = news.length < total;

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
    news,
    isLoading: isValidating && size === 1,
    hasMore,
    error: error ? "Не удалось загрузить новости. Попробуйте позже." : null,
    loader,
  };
};
