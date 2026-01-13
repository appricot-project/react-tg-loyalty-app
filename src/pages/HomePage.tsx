import { Avatar } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NewsList } from "@/components/NewsList";
import { useAppSelector } from "@/store/hooks";

export const HomePage = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const userAcronym = user ? (user.firstName[0] + (user.lastName?.[0] || "")).toUpperCase() : "";

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="px-4 py-4">
      {user && (
        <div className="flex items-center gap-4 mb-6 p-4">
          <Avatar acronym={userAcronym} className="flex-shrink-0" size={48} src={user.photoUrl} />
          <div className="flex-1">
            <div className="font-semibold text-lg text-[var(--color-gray-1000)]">
              Привет, {user.firstName}!
            </div>
            {user.username && (
              <div className="text-[var(--color-gray-400)] text-sm">@{user.username}</div>
            )}
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-[var(--color-gray-1000)] mb-6">Новости</h1>
      <NewsList />
    </div>
  );
};
