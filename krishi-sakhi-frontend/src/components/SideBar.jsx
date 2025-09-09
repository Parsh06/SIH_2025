
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';

const linkClass = ({isActive}) => `block px-4 py-2 rounded-xl ${isActive ? 'bg-leaf-100 text-leaf-800' : 'hover:bg-leaf-50'}`;

export default function SideBar(){
  const { t } = useI18n();
  return (
    <aside className="w-72 p-4 space-y-1">
      <NavLink to="/" className={linkClass}>{t["nav.dashboard"]}</NavLink>
      <NavLink to="/profile" className={linkClass}>{t["nav.profile"]}</NavLink>
      <NavLink to="/activity" className={linkClass}>{t["nav.activity"]}</NavLink>
      <NavLink to="/advisory" className={linkClass}>{t["nav.advisory"]}</NavLink>
      <NavLink to="/reminders" className={linkClass}>{t["nav.reminders"]}</NavLink>
      <NavLink to="/knowledge" className={linkClass}>{t["nav.knowledge"]}</NavLink>
      <NavLink to="/prices" className={linkClass}>{t["nav.prices"]}</NavLink>
      <NavLink to="/chat" className={linkClass}>{t["nav.chat"]}</NavLink>
      <NavLink to="/settings" className={linkClass}>{t["nav.settings"]}</NavLink>
    </aside>
  );
}
