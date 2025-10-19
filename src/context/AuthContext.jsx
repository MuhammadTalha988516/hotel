import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('luxestay_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('luxestay_user');
      }
    }
    setLoading(false);
  }, []);

  const setSession = (userData, token) => {
    setUser(userData);
    localStorage.setItem('luxestay_user', JSON.stringify(userData));
    localStorage.setItem('luxestay_token', token);
  };

  const apiPost = async (url, body) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  const login = async (email, password) => {
    try {
      const data = await apiPost('http://localhost:5001/api/auth/login', { email, password });
      if (data.success) {
        const userData = { id: data.user.id, email: data.user.email, name: data.user.name, role: data.user.role, avatar: data.user.avatar, token: data.token };
        setSession(userData, data.token);
        return { success: true };
      }
      return { success: false, error: data.message || 'Login failed' };
    } catch (e) {
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const body = typeof name === 'object' ? name : { name, email, password };
      const data = await apiPost('http://localhost:5001/api/auth/register', body);
      if (data.success) {
        const userData = { id: data.user.id, email: data.user.email, name: data.user.name, role: data.user.role, avatar: data.user.avatar, token: data.token };
        setSession(userData, data.token);
        return { success: true };
      }
      return { success: false, error: data.message || 'Signup failed' };
    } catch (e) {
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const hotelLogin = async (email, password) => {
    try {
      const data = await apiPost('http://localhost:5001/api/hotel-auth/login', { email, password });
      if (data.success) {
        const userData = { id: data.user.id, email: data.user.email, name: data.user.name, role: data.user.role, avatar: data.user.avatar, token: data.token };
        setSession(userData, data.token);
        return { success: true };
      }
      return { success: false, error: data.message || 'Login failed' };
    } catch (e) {
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const hotelSignup = async (name, email, password) => {
    try {
      const body = typeof name === 'object' ? name : { name, email, password };
      const data = await apiPost('http://localhost:5001/api/hotel-auth/register', body);
      if (data.success) {
        const userData = { id: data.user.id, email: data.user.email, name: data.user.name, role: data.user.role, avatar: data.user.avatar, token: data.token };
        setSession(userData, data.token);
        return { success: true };
      }
      return { success: false, error: data.message || 'Signup failed' };
    } catch (e) {
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxestay_user');
    localStorage.removeItem('luxestay_token');
  };

  const value = { user, login, signup, hotelLogin, hotelSignup, logout, loading, isAuthenticated: !!user, isAdmin: user?.role === 'admin' };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};