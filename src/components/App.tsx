import { AppRoot } from "@telegram-apps/telegram-ui";
import { useLaunchParams, useSignal, miniApp } from "@tma.js/sdk-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";

import { routes } from "@/navigation/routes.tsx";
import { useTelegramAuth } from "@/services/useTelegramUser";
import { store, persistor } from "@/store/store";

import { NavBar } from "./NavBar";

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
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                background: "#ff9800",
                color: "#fff",
                textAlign: "center",
                zIndex: 1000,
                fontSize: 12,
                padding: "2px 0",
              }}
            >
              Демо-режим: авторизация не защищена
            </div>
          )}
          <HashRouter>
            <InitTelegramAuth />
            <NavBar />
            <Routes>
              {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </HashRouter>
        </AppRoot>
      </PersistGate>
    </Provider>
  );
}
