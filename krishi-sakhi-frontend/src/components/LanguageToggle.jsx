
import React from 'react';
import { useI18n } from '../context/I18nContext';
import Button from './ui/button';

export default function LanguageToggle(){
  const { t, toggle } = useI18n();
  return <Button variant="outline" onClick={toggle} aria-label="Toggle language">{t["lang.toggle"]}</Button>
}
