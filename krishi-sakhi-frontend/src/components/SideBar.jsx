import { Leaf } from 'lucide-react';
import React from "react";
import {
    MdAlarm,
    MdChatBubble,
    MdDashboard,
    MdEventNote,
    MdMenuBook,
    MdPerson,
    MdPriceChange,
    MdStore,
    MdTipsAndUpdates,
} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useI18n } from "../context/I18nContext";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-2xl transition ${
    isActive
      ? "bg-leaf-100 text-leaf-800 border border-leaf-200 shadow-soft"
      : "hover:bg-leaf-50 text-soil-800"
  }`;

export default function SideBar() {
  const { t } = useI18n();
  return (
    <aside className="space-y-3">
      {/* Logo and Title at the very top */}
      <div className="p-6 pb-4 border-b border-leaf-200">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-9 h-9 rounded-2xl bg-leaf-600 text-white grid place-items-center font-bold hover:scale-105 transition-transform">
            <Leaf size={18} />
          </Link>
          <Link to="/" className="font-semibold text-lg hover:text-leaf-700">{t["app.title"]}</Link>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="p-6 pt-4 space-y-3">
        <NavLink to="/dashboard" className={linkClass}>
        <MdDashboard /> <span>{t["nav.dashboard"]}</span>
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        <MdPerson /> <span>{t["nav.profile"]}</span>
      </NavLink>
      <NavLink to="/activity" className={linkClass}>
        <MdEventNote /> <span>{t["nav.activity"]}</span>
      </NavLink>
      <NavLink to="/advisory" className={linkClass}>
        <MdTipsAndUpdates /> <span>{t["nav.advisory"]}</span>
      </NavLink>
      <NavLink to="/reminders" className={linkClass}>
        <MdAlarm /> <span>{t["nav.reminders"]}</span>
      </NavLink>
      <NavLink to="/knowledge" className={linkClass}>
        <MdMenuBook /> <span>{t["nav.knowledge"]}</span>
      </NavLink>
      <NavLink to="/schemes" className={linkClass}>
        <MdMenuBook /> <span>{t["nav.schemes"]}</span>
      </NavLink>
      <NavLink to="/prices" className={linkClass}>
        <MdPriceChange /> <span>{t["nav.prices"]}</span>
      </NavLink>
      <NavLink to="/marketplace" className={linkClass}>
        <MdStore /> <span>{t["nav.marketplace"]}</span>
      </NavLink>
      <NavLink to="/chat" className={linkClass}>
        <MdChatBubble /> <span>{t["nav.chat"]}</span>
      </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <MdTipsAndUpdates /> <span>{t["nav.settings"]}</span>
        </NavLink>
      </div>
    </aside>
  );
}
