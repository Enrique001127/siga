import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

// Sample user data (in a real app, this would come from an API)
const mockUser: User = {
  id: '1',
  name: 'Enrique Martín',
  email: 'emartinm@uci.cu',
  role: 'admin',
  avatarUrl: `/public/Imagenes/OIP.jpg`,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would make an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(mockUser);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};