
import React from 'react';
import { useI18n } from '../context/I18nContext';
import Button from './ui/button';
import { MdTranslate } from 'react-icons/md';

export default function LanguageToggle(){
  const { t, toggle } = useI18n();
  return <Button variant="outline" onClick={toggle} aria-label="Toggle language" className="!px-3 gap-2"><MdTranslate size={18} /> <span className="hidden sm:inline">{t["lang.toggle"]}</span></Button>
}
