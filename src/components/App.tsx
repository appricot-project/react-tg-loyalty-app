import { AppRoot } from "@telegram-apps/telegram-ui";
import { useLaunchParams, useSignal, miniApp } from "@tma.js/sdk-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";

import { routes } from "@/navigation/routes.tsx";
import { useTelegramAuth } from "@/services/useTelegramUser";
import { store, persistor } from "@/store/store";

import { NavBar } from "./NavBar";

import "@telegram-apps/telegram-ui/dist/styles.css";

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  const InitTelegramAuth = () => {
    useTelegramAuth();
    return null;
  };

  const demoMode = import.meta.env.VITE_DEMO_MODE === "true";

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoot
          appearance={isDark ? "dark" : "light"}
          platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
        >
          {demoMode && (
            <div className="fixed top-0 left-0 w-full bg-orange-500 text-white text-center z-[1000] text-xs py-0.5">
              Демо-режим: авторизация не защищена
            </div>
          )}
          <HashRouter>
            <InitTelegramAuth />
            <NavBar />
            <div className="pb-20">
              <Routes>
                {routes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </HashRouter>
        </AppRoot>
      </PersistGate>
    </Provider>
  );
}
