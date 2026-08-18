import React, { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, ChevronDown } from 'lucide-react';
import { navConfig } from '../config/navConfig';
import { logout } from '../store/authSlice';

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role);
  const links = navConfig[role] || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState(() => {
  const activeParent = links.find((l) => l.children?.some((c) => location.pathname === `/dashboard/${c.path}`));
  return activeParent ? activeParent.label : null;
});

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isGroupActive = (children) =>
    children.some((c) => location.pathname === `/dashboard/${c.path}`);

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6">
        <h1 className="font-heading text-2xl text-sidebar-primary">SmartSociety</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => {
          if (link.children) {
            const active = isGroupActive(link.children);
            const isOpen = openGroup === link.label;
            return (
              <div key={link.label}>
                <button
                  onClick={() => setOpenGroup(isOpen ? null : link.label)}
                  className={`flex items-center justify-between w-full gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
                >
                  <span className="flex items-center gap-3">
                    <link.icon size={18} />
                    {link.label}
                  </span>
                  <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="mt-1 ml-6 space-y-1 border-l border-sidebar-border pl-3">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={`/dashboard/${child.path}`}
                        end
                        className={({ isActive }) => `block px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent'}`}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink key={link.path} to={link.path === '' ? '/dashboard' : `/dashboard/${link.path}`} end={link.path === ''} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
              <link.icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;