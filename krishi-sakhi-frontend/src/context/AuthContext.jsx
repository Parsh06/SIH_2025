import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { subscribeToAuthChanges, signInWithEmail, signOutUser, signUpWithEmail } from '../lib/firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(currentUser => {
      setUser(currentUser);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  async function signup({ email, password, displayName }) {
    setAuthError(null);
    try {
      const created = await signUpWithEmail({ email, password, displayName });
      setUser(created);
      return created;
    } catch (error) {
      setAuthError(error);
      throw error;
    }
  }

  async function login({ email, password }) {
    setAuthError(null);
    try {
      const logged = await signInWithEmail({ email, password });
      setUser(logged);
      return logged;
    } catch (error) {
      setAuthError(error);
      throw error;
    }
  }

  async function logout() {
    await signOutUser();
    setUser(null);
  }

  const value = useMemo(() => ({ user, initializing, authError, signup, login, logout }), [user, initializing, authError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


