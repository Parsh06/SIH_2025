import React from 'react';
import MobileNav from './MobileNav';
import NavBar from './NavBar';
import SideBar from './SideBar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-leaf-50/40">
      <NavBar />
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 z-30">
          <div className="h-full overflow-y-auto bg-white border-r border-leaf-200 shadow-sm">
            <SideBar />
          </div>
        </div>

        {/* Main Content with left margin for fixed sidebar */}
        <main className="flex-1 md:ml-72">
          <div className="max-w-7xl mx-auto container-px section-gap">
            <div className="space-y-6 py-6">
              {children}
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
