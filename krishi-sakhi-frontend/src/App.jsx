import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import MobileNav from './components/MobileNav';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Activity from './pages/Activity';
import Advisory from './pages/Advisory';
import Reminders from './pages/Reminders';
import Knowledge from './pages/Knowledge';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Prices from './pages/Prices';

export default function App(){
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-leaf-50/40">
      <NavBar />
      <div className="max-w-7xl mx-auto container-px section-gap grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6">
        <div className="hidden md:block"><SideBar /></div>
        <main className="space-y-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
