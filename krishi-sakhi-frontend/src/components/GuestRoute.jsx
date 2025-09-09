import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GuestRoute() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="animate-pulse text-leaf-700">Preparing sign-in…</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}


