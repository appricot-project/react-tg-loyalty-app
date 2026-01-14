import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/store/hooks";

export const AuthPage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md rounded-2xl bg-[var(--tg-theme-section-bg-color,#ffffff)] border border-[var(--border-color)] p-6 flex flex-col items-center shadow-lg">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4 text-center">
          {t("auth.title")}
        </h1>

        <p className="text-center text-[var(--color-gray-500)] mb-6 max-w-xs">
          {t("auth.description")}
        </p>

        <button
          className="px-6 py-2 rounded-lg bg-[var(--color-blue-500)] text-white font-semibold text-base shadow"
          type="button"
          onClick={() => window.location.reload()}
        >
          {t("auth.button")}
        </button>
      </div>
    </div>
  );
};
