import React from "react";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "../context/I18nContext";
import {
  MdAgriculture,
  MdNotificationsNone,
  MdAccountCircle,
} from "react-icons/md";
import Button from "./ui/button";
import Input from "./ui/input";

export default function NavBar() {
  const { t } = useI18n();
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-leaf-100">
      <div className="max-w-7xl mx-auto container-px py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-leaf-600 text-white grid place-items-center shadow-soft">
          <MdAgriculture size={22} />
        </div>
        <div className="font-semibold text-lg tracking-tight text-soil-800">
          {t["app.title"]}
        </div>
        <div className="text-soil-700 hidden lg:block">
          {t["app.tagline"] || "Grow smarter with timely insights"}
        </div>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 bg-white border border-leaf-200 rounded-2xl px-3 py-1.5 shadow-soft">
            <input
              className="outline-none text-sm placeholder:text-soil-700/60"
              placeholder={t["search"] || "Search..."}
            />
          </div>
          <Button
            variant="outline"
            aria-label="Notifications"
            title="Notifications"
            className="!px-3"
          >
            <MdNotificationsNone size={18} />
          </Button>
          <LanguageToggle />
          <Button
            variant="outline"
            aria-label="Profile"
            title="Profile"
            className="!px-3"
          >
            <MdAccountCircle size={20} />
          </Button>
        </div>
        <div className="ml-auto md:hidden">
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
