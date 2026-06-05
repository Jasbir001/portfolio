import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Set default axios configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_URL;

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  // Set auth header helper
  const setAuthHeader = (jwtToken) => {
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Check if token is valid on load
  useEffect(() => {
    const loadAdmin = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setAuthHeader(token);
        const res = await axios.get('/auth/me');
        if (res.data.success) {
          setAdmin(res.data.admin);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error verifying token:', error.response?.data?.message || error.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadAdmin();
  }, [token]);

  // Login handler
  const login = async (usernameOrEmail, password) => {
    try {
      const res = await axios.post('/auth/login', { usernameOrEmail, password });
      
      if (res.data.success) {
        const newToken = res.data.token;
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
        setAdmin(res.data.admin);
        setAuthHeader(newToken);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid username or password'
      };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
    setAuthHeader(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, isAuthenticated: !!admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
