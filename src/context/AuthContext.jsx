import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUser, getToken, removeToken, apiGet } from '../services/api';


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());

  const refreshUser = () => {
    const currentUser = getUser();
    setUser(currentUser);
  };

  const handleLogout = async () => {
    try {
      const token = getToken();
      if (token) {
        const API_BASE = import.meta.env.VITE_API_BASE || '/api';
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).catch(() => {});
      }
    } catch (e) {
      console.error(e);
    }
    removeToken();
    setUser(null);
  };

  // Periodically check if the session is still valid on the server
  // This catches the case where another device logged in and kicked this one out
  const checkSession = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || '/api';
      const response = await fetch(`${API_BASE}/auth/session-check`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        // Session has been invalidated (another device kicked us out)
        removeToken();
        setUser(null);
        alert("You have been logged out because the maximum number of login devices has been reached.");
        window.location.reload();
      }
    } catch (e) {
      // Network error, don't logout
      console.error("Session check failed:", e);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    // Check session validity every 30 seconds
    const interval = setInterval(checkSession, 30000);

    // Also check immediately on mount
    checkSession();

    return () => clearInterval(interval);
  }, [user, checkSession]);

  const value = {
    user,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'ADMIN',
    refreshUser,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
