import type { ComponentType, JSX } from 'react';


import { HomePage } from '@/pages/HomePage';
import { UploadPage } from '@/pages/UploadPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { AuthPage } from '@/pages/AuthPage';


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: HomePage, title: 'Новости' },
  { path: '/upload', Component: UploadPage, title: 'Загрузка чека' },
  { path: '/history', Component: HistoryPage, title: 'История чеков' },
  { path: '/auth', Component: AuthPage, title: 'Авторизация' },
];
