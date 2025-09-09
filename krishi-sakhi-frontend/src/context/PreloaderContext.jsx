import React, { createContext, useContext, useState } from 'react';

const PreloaderContext = createContext();

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
}

export function PreloaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const hidePreloader = () => {
    setIsLoading(false);
  };

  const showPreloader = () => {
    setIsLoading(true);
  };

  return (
    <PreloaderContext.Provider value={{ isLoading, hidePreloader, showPreloader }}>
      {children}
    </PreloaderContext.Provider>
  );
}
