import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { routes } from "@/navigation/routes";

export const NavBar = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--tg-theme-section-bg-color,#f0f0f0)] border-t border-[var(--border-color)] shadow-2xl z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-stretch px-1 py-2 max-w-md mx-auto w-full">
        {routes
          .filter((route) => route.showInNavBar)
          .map(({ path, title, icon }) => (
            <NavLink
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 no-underline flex-1 gap-1 ${
                  isActive
                    ? "bg-[var(--tg-theme-section-bg-color,#f0f0f0)] text-[var(--text-accent)]"
                    : "text-[var(--color-gray-400)]"
                }`
              }
              end={path === "/"}
              key={path}
              to={path}
            >
              {icon && <span className="text-xl">{icon}</span>}
              <span className="text-xs font-medium leading-tight text-center">
                {t(title || "")}
              </span>
            </NavLink>
          ))}
      </div>
    </nav>
  );
};
