import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useNewsDetail } from "@/hooks/useNewsDetail";

const NewsSkeleton = () => (
  <div className="rounded-2xl bg-white border border-[var(--color-gray-100)] shadow-lg p-10 mb-4 flex flex-col items-center gap-4">
    <div className="w-3/4 h-8 bg-[var(--color-gray-800)] rounded-lg animate-pulse" />

    <div className="w-12 h-1 bg-[var(--color-gray-100)] rounded-full my-2" />

    <div className="w-full space-y-2">
      <div className="h-4 bg-[var(--color-gray-800)] rounded animate-pulse" />
      <div className="h-4 bg-[var(--color-gray-800)] rounded animate-pulse w-5/6" />
    </div>
  </div>
);

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { news, isLoading, error } = useNewsDetail(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error && !isLoading) {
    return (
      <div className="min-h-screen pb-12 flex flex-col items-center justify-center px-4">
        <div className="text-lg text-[var(--color-gray-400)] text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 flex flex-col items-center">
      <div className="w-full max-w-xl mt-1 px-3">
        <button
          className="mt-4 mb-6 ml-1 px-4 py-2 text-md text-[var(--color-gray-1000)] hover:text-[var(--color-red-200)] transition-colors duration-200 font-medium animate-[fadein_0.5s]"
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>

        {isLoading ? (
          <NewsSkeleton />
        ) : (
          <div className="rounded-2xl bg-white border border-[var(--color-gray-100)] shadow-lg p-10 mb-4 flex flex-col items-center animate-[fadein_0.5s]">
            <h1 className="text-2xl font-bold mb-6 text-[var(--color-gray-700)] text-center leading-tight">
              {news?.title}
            </h1>

            <div className="w-12 h-1 bg-[var(--color-gray-100)] rounded-full mb-6" />
            <p className="text-md text-[var(--color-gray-400)] leading-relaxed text-center font-normal">
              {news?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
