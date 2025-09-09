import React from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../context/I18nContext";
import {
  MdDashboard,
  MdPerson,
  MdEventNote,
  MdTipsAndUpdates,
  MdAlarm,
  MdMenuBook,
  MdPriceChange,
  MdChatBubble,
} from "react-icons/md";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-2xl transition ${
    isActive
      ? "bg-leaf-100 text-leaf-800 border border-leaf-200 shadow-soft"
      : "hover:bg-leaf-50 text-soil-800"
  }`;

export default function SideBar() {
  const { t } = useI18n();
  return (
    <aside className="w-72 p-4 space-y-2">
      <NavLink to="/" className={linkClass}>
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
      <NavLink to="/prices" className={linkClass}>
        <MdPriceChange /> <span>{t["nav.prices"]}</span>
      </NavLink>
      <NavLink to="/chat" className={linkClass}>
        <MdChatBubble /> <span>{t["nav.chat"]}</span>
      </NavLink>
      <NavLink to="/settings" className={linkClass}>
        <MdTipsAndUpdates /> <span>{t["nav.settings"]}</span>
      </NavLink>
    </aside>
  );
}
