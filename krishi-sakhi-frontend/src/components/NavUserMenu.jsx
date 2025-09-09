import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export default function NavUserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-leaf-900">{user.displayName || user.email}</div>
      <Button variant="outline" onClick={logout}>Logout</Button>
    </div>
  );
}


