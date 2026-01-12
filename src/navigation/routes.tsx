import type { ComponentType, JSX } from "react";

import { HomePage } from "@/pages/HomePage";
import { UploadPage } from "@/pages/UploadPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { AuthPage } from "@/pages/AuthPage";
import { NewsDetailPage } from "@/pages/NewsDetailPage";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  showInNavBar?: boolean;
}

export const routes: Route[] = [
  { path: "/", Component: HomePage, title: "Новости", icon: "📰", showInNavBar: true },
  {
    path: "/news/:id",
    Component: NewsDetailPage,
    title: "Новость",
  },
  {
    path: "/upload",
    Component: UploadPage,
    title: "Загрузка чека",
    icon: "📸",
    showInNavBar: true,
  },
  {
    path: "/history",
    Component: HistoryPage,
    title: "История чеков",
    icon: "📋",
    showInNavBar: true,
  },
  { path: "/auth", Component: AuthPage, title: "Авторизация" },
];
