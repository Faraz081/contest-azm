import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-end px-6 gap-4">
      <Link to="/dashboard/profile" className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 hover:bg-accent transition-colors">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
          {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="text-left leading-tight">
          <div className="text-sm font-medium">{user?.username || 'User'}</div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{user?.role || 'Member'}</div>
        </div>
      </Link>
    </header>
  );
};

export default Header;