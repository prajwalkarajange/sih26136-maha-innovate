import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User;
  token: string | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: string) => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  logout: () => void;
}

const defaultPublicUser: User = {
  id: 1,
  name: 'Shri Rajesh Patil',
  email: 'officer@maharashtra.gov.in',
  role: 'government',
  designation: 'Officer / Urban Development Dept.',
  department_id: 1,
  phone: '+91 98201 12345'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mahinnovate_auth_status') === 'authenticated';
  });

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('mahinnovate_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultPublicUser;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mahinnovate_token') || null);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('mahinnovate_auth_status', 'authenticated');
      localStorage.setItem('mahinnovate_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mahinnovate_auth_status');
    }
  }, [isAuthenticated, user]);

  const login = async (email: string, role?: string) => {
    const res = await api.login(email, role);
    setUser(res.user);
    setToken(res.token);
    setIsAuthenticated(true);
    localStorage.setItem('mahinnovate_token', res.token);
    localStorage.setItem('mahinnovate_auth_status', 'authenticated');
    localStorage.setItem('mahinnovate_user', JSON.stringify(res.user));
  };

  const switchRole = async (newRole: UserRole) => {
    const switchedUser = await api.switchRole(newRole);
    setUser(switchedUser);
    setToken(`token-${switchedUser.id}`);
    setIsAuthenticated(true);
    localStorage.setItem('mahinnovate_auth_status', 'authenticated');
    localStorage.setItem('mahinnovate_user', JSON.stringify(switchedUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(defaultPublicUser);
    setToken(null);
    localStorage.removeItem('mahinnovate_token');
    localStorage.removeItem('mahinnovate_auth_status');
    localStorage.removeItem('mahinnovate_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, role: user.role, isAuthenticated, login, switchRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
