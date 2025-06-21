import React, { createContext, useState, useEffect } from 'react';
import type { IUser } from '../types/User';
import type { AuthContextType } from '../types/AuthContextType';
import { login  } from '../services/authService'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storageUser = localStorage.getItem('user');
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
  }, []);

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
