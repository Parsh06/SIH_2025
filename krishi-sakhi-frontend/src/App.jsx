import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Activity from './pages/Activity';
import Advisory from './pages/Advisory';
import Reminders from './pages/Reminders';
import Knowledge from './pages/Knowledge';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Prices from './pages/Prices';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

export default function App(){
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
        <Route path="/activity" element={<AppLayout><Activity /></AppLayout>} />
        <Route path="/advisory" element={<AppLayout><Advisory /></AppLayout>} />
        <Route path="/reminders" element={<AppLayout><Reminders /></AppLayout>} />
        <Route path="/knowledge" element={<AppLayout><Knowledge /></AppLayout>} />
        <Route path="/prices" element={<AppLayout><Prices /></AppLayout>} />
        <Route path="/chat" element={<AppLayout><Chat /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
      </Route>
    </Routes>
  );
}
