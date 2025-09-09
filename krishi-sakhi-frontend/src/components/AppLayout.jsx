import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import MobileNav from './MobileNav';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-leaf-50/40">
      <NavBar />
      <div className="max-w-7xl mx-auto container-px section-gap grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6">
        <div className="hidden md:block"><SideBar /></div>
        <main className="space-y-6">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}


