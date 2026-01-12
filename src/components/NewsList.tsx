import { Spinner } from "@telegram-apps/telegram-ui";

import { useNews } from "@/hooks/useNews";

import { NewsCard } from "./NewsCard";

export const NewsList = () => {
  const { news, isLoading, hasMore, error, loader } = useNews();

  const showSkeletons = !error && news.length === 0 && isLoading;
  const showLoader = news.length > 0 && !error && hasMore;

  return (
    <>
      {error && (
        <div className="my-6 p-6 rounded-2xl bg-white border border-[var(--color-gray-100)] text-center">
          <h3 className="text-lg font-semibold text-[var(--color-red-200)] mb-2">Ошибка</h3>
          <p className="text-[var(--color-gray-400)]">{error}</p>
        </div>
      )}

      {showSkeletons && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-[120px] rounded-2xl bg-[var(--color-gray-800)] animate-[fadein_0.5s]"
            />
          ))}
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
