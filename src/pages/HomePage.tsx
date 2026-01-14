import { Avatar } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { NewsList } from "@/components/NewsList";
import { useAppSelector } from "@/store/hooks";

const AVATAR_SIZE = 48;

export const HomePage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const userAcronym = user ? (user.firstName[0] + (user.lastName?.[0] || "")).toUpperCase() : "";

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("newsScroll");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
      sessionStorage.removeItem("newsScroll");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="px-4 py-4">
      {user && (
        <div className="flex items-center gap-4 mt-2 mb-6 px-2 pt-2 pb-2">
          <Avatar
            acronym={userAcronym}
            className="flex-shrink-0"
            size={AVATAR_SIZE}
            src={user.photoUrl}
          />
          <div className="flex-1">
            <div className="font-semibold text-lg text-[var(--text-primary)]">
              {t("greetings")}, {user.firstName}!
            </div>
            {user.username && (
              <div className="text-[var(--color-gray-400)] text-sm">@{user.username}</div>
            )}
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{t("news.title")}</h1>
      <NewsList />
    </div>
  );
};
