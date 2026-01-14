import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { useNewsDetail } from "@/hooks/useNewsDetail";

const NewsSkeleton = () => (
  <div className="rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-lg p-10 mb-4 flex flex-col items-center gap-4">
    <div className="w-3/4 h-8 bg-[var(--bg-secondary)] rounded-lg animate-pulse" />

    <div className="w-12 h-1 bg-[var(--border-color)] rounded-full my-2" />

    <div className="w-full space-y-2">
      <div className="h-4 bg-[var(--bg-secondary)] rounded animate-pulse" />
      <div className="h-4 bg-[var(--bg-secondary)] rounded animate-pulse w-5/6" />
    </div>
  </div>
);

export const NewsDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { news, isLoading, error } = useNewsDetail(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error && !isLoading) {
    return (
      <div className="min-h-screen pb-12 flex flex-col items-center justify-center px-4">
        <div className="text-lg text-[var(--color-gray-400)] text-center">{t(error)}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 flex flex-col items-center">
      <div className="w-full max-w-xl mt-3 px-3">
        <button
          className="mt-4 mb-6 ml-1 p-2 text-md text-[var(--text-primary)] transition-colors duration-200 font-medium animate-[fadein_0.5s]"
          type="button"
          onClick={() => navigate("/")}
        >
          ← {t("receiptCard.back")}
        </button>

        {isLoading ? (
          <NewsSkeleton />
        ) : (
          <div className="rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-lg p-10 mb-4 flex flex-col items-center animate-[fadein_0.5s]">
            <h1 className="text-2xl font-bold mb-6 text-[var(--text-accent)] text-center leading-tight">
              {news?.title}
            </h1>

            <div className="w-12 h-1 bg-[var(--border-color)] rounded-full mb-6" />
            <p className="text-md text-[var(--color-gray-400)] leading-relaxed text-center font-normal">
              {news?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
