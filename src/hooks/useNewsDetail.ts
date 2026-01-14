import useSWR from "swr";

import { mockNews } from "@/mocks/mockNews";

const DELAY = 500;

const fetcher = async (key: string) => {
  const id = key.replace("news-detail-", "");
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return mockNews.find((n) => n.id === id);
};

export const useNewsDetail = (id?: string) => {
  const { data: news, error, isLoading } = useSWR(id ? `news-detail-${id}` : null, fetcher);

  return {
    news: news || null,
    isLoading,
    error: error ? "news.loadDetailError" : !news && !isLoading && id ? "news.noDetailNews" : null,
  };
};
