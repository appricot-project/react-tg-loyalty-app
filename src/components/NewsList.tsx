import { Spinner } from "@telegram-apps/telegram-ui";
import { useTranslation } from "react-i18next";

import { useNews } from "@/hooks/useNews";

import { NewsCard } from "./NewsCard";

export const NewsList = () => {
  const { t } = useTranslation();
  const { news, isLoading, hasMore, error, loader } = useNews();

  const showSkeletons = !error && news.length === 0 && isLoading;
  const showLoader = news.length > 0 && !error && hasMore;

  return (
    <>
      {error && (
        <div className="my-6 p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-center shadow-lg">
          <h3 className="text-lg font-semibold text-[var(--color-red-200)] mb-2">
            {t("error.title")}
          </h3>
          <p className="text-[var(--color-gray-400)]">{t(error)}</p>
        </div>
      )}

      {showSkeletons && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map(() => {
            const uniqueKey = `skeleton-${Math.random().toString(36).substr(2, 9)}`;
            return (
              <div
                key={uniqueKey}
                className="h-[120px] rounded-2xl bg-[var(--bg-secondary)] animate-[fadein_0.5s] border border-[var(--border-color)]"
              />
            );
          })}
        </div>
      )}

      {!error && (
        <div className="flex flex-col gap-5 max-w-xl w-full mx-auto">
          {news.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      )}

      {showLoader && (
        <div className="flex justify-center my-6">
          <Spinner size="l" />
        </div>
      )}
      {hasMore && !error && <div ref={loader} className="h-1" />}
    </>
  );
};
