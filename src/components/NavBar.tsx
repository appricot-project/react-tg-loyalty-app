import { NavLink } from 'react-router-dom';

import { routes } from '@/navigation/routes';

export const NavBar = () => (
  <nav style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '16px 0' }}>
    {routes.map(({ path, title }) => (
      <NavLink
			end={path === '/'}
        key={path}
        style={({ isActive }) => ({
					fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
          color: isActive ? '#0088cc' : '#222',
        })}
				to={path}
      >
        {title}
      </NavLink>
    ))}
  </nav>
);
