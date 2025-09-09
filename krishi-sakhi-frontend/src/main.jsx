
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppStore';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext';
import { PreloaderProvider } from './context/PreloaderContext';
import './styles/globals.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <AppProvider>
            <PreloaderProvider>
              <App />
            </PreloaderProvider>
          </AppProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
);
