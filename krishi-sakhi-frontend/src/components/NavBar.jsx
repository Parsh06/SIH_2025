
import React from 'react';
import LanguageToggle from './LanguageToggle';
import { useI18n } from '../context/I18nContext';

export default function NavBar(){
  const { t } = useI18n();
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-leaf-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-leaf-600 text-white grid place-items-center font-bold">KS</div>
        <div className="font-semibold text-lg">{t["app.title"]}</div>
        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
