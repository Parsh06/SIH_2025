import React from "react";
import {
  MdChatBubble,
  MdDashboard,
  MdEventNote,
  MdSettings,
  MdTipsAndUpdates,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", icon: MdDashboard, label: "Home" },
  { to: "/activity", icon: MdEventNote, label: "Activity" },
  { to: "/advisory", icon: MdTipsAndUpdates, label: "Advisory" },
  { to: "/chat", icon: MdChatBubble, label: "Chat" },
  { to: "/settings", icon: MdSettings, label: "Settings" },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-leaf-100 bg-white/90 backdrop-blur md:hidden">
      <div className="max-w-7xl mx-auto px-2 py-2 pb-[calc(0.5rem+var(--safe,0px))] grid grid-cols-5 gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-1 rounded-xl ${
                isActive
                  ? "text-leaf-700 bg-leaf-50 shadow-soft"
                  : "text-soil-700 hover:bg-leaf-50/60"
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
