import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import ml from '../i18n/ml.json';

const dicts = { en, ml };
const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const t = useMemo(() => dicts[lang] || dicts.en, [lang]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'ml' ? 'ml' : 'en';
  }, [lang]);

  const toggle = () => setLang(prev => prev === 'en' ? 'ml' : 'en');

  return (
    <I18nContext.Provider value={{ lang, t, setLang, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
