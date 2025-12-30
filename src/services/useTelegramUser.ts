import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/userSlice";

// true = демо, false = backend
const demoMode = import.meta.env.VITE_DEMO_MODE === "true";
const API_URL = import.meta.env.VITE_API_URL || "";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
        ready?: () => void;
      };
    };
  }
}

export const useTelegramAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    if (demoMode) {
      const user = tg.initDataUnsafe?.user;

      if (user) {
        dispatch(
          setUser({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            photoUrl: user.photo_url,
          }),
        );
      }
    } else {
      const initData = tg.initData;

      fetch(`${API_URL}/auth/telegram`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            dispatch(setUser(data.user));
          }
          if (data?.token) {
            localStorage.setItem("jwt", data.token);
          }
        })
        .catch(() => {
          // TODO: обработка ошибок авторизации
        });
    }

    tg.ready && tg.ready();
  }, [dispatch]);
};
