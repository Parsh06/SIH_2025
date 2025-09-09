import React from 'react';
import MobileNav from './MobileNav';
import NavBar from './NavBar';
import SideBar from './SideBar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-leaf-50/40">
      <div className="flex">
        {/* Fixed Sidebar - positioned above navbar */}
        <div className="hidden md:block fixed left-0 top-0 h-screen w-72 z-40">
          <div className="h-full overflow-y-auto bg-white border-r border-leaf-200 shadow-sm">
            <SideBar />
          </div>
        </div>

        {/* NavBar positioned below sidebar */}
        <div className="flex-1 md:ml-72">
          <NavBar />
        </div>
      </div>

      {/* Main Content */}
      <main className="md:ml-72">
        <div className="max-w-7xl mx-auto container-px section-gap">
          <div className="space-y-6 py-6">
            {children}
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
