import React, { createContext, useContext, useEffect, useState } from 'react';

const AppStore = createContext();

const defaultState = {
  profile: { name: '', phone: '', location: '', landSize: '', crop: '', soil: '', irrigation: '' },
  activities: [],
  advisories: [
    { id: 1, title: "Rain expected, avoid spraying tomorrow", severity: "info", time: new Date().toISOString() },
    { id: 2, title: "Pest outbreak nearby — inspect brinjal crop", severity: "warn", time: new Date().toISOString() }
  ],
  reminders: [
    { id: 1, text: "Fertilizer application due on Friday", due: new Date(Date.now()+86400000*2).toISOString() }
  ]
};

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    const raw = localStorage.getItem('app-state');
    return raw ? JSON.parse(raw) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('app-state', JSON.stringify(state));
  }, [state]);

  const updateProfile = (patch) => setState(s => ({ ...s, profile: { ...s.profile, ...patch }}));
  const addActivity = (item) => setState(s => ({ ...s, activities: [{ id: Date.now(), ...item }, ...s.activities]}));
  const removeActivity = (id) => setState(s => ({ ...s, activities: s.activities.filter(a => a.id !== id)}));

  return (
    <AppStore.Provider value={{ state, setState, updateProfile, addActivity, removeActivity }}>
      {children}
    </AppStore.Provider>
  );
}

export function useApp() {
  return useContext(AppStore);
}
