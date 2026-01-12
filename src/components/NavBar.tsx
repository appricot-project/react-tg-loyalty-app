import { NavLink } from "react-router-dom";

import { routes } from "@/navigation/routes";

export const NavBar = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-gray-100)] shadow-2xl z-50 safe-area-inset-bottom">
    <div className="flex justify-around items-stretch px-1 py-2 max-w-md mx-auto w-full">
      {routes
        .filter((route) => route.showInNavBar)
        .map(({ path, title, icon }) => (
          <NavLink
            end={path === "/"}
            key={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 no-underline flex-1 gap-1 ${
                isActive
                  ? "bg-[var(--color-gray-100)] text-[var(--color-red-200)]"
                  : "text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)]"
              }`
            }
            to={path}
          >
            {icon && <span className="text-xl">{icon}</span>}
            <span className="text-xs font-medium leading-tight text-center">{title}</span>
          </NavLink>
        ))}
    </div>
  </nav>
);
