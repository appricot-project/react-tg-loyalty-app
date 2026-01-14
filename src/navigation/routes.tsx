import type { ComponentType, JSX } from "react";

import { AuthPage } from "@/pages/AuthPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { HomePage } from "@/pages/HomePage";
import { NewsDetailPage } from "@/pages/NewsDetailPage";
import { UploadPage } from "@/pages/UploadPage";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element | string;
  showInNavBar?: boolean;
}

export const routes: Route[] = [
  {
    path: "/auth",
    Component: AuthPage,
    title: "nav.auth",
  },
  {
    path: "/",
    Component: HomePage,
    title: "nav.news",
    icon: "📰",
    showInNavBar: true,
  },
  {
    path: "/news/:id",
    Component: NewsDetailPage,
    title: "nav.detailNews",
  },
  {
    path: "/upload",
    Component: UploadPage,
    title: "nav.upload",
    icon: "📸",
    showInNavBar: true,
  },
  {
    path: "/history",
    Component: HistoryPage,
    title: "nav.history",
    icon: "📋",
    showInNavBar: true,
  },
];
