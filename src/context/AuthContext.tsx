'use client'

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Mock de usuário e senha
const MOCK_USER = "admin";
const MOCK_PASSWORD = "12345";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = (username: string, password: string) => {
    if (username === MOCK_USER && password === MOCK_PASSWORD) {
      setIsAuthenticated(true);
      router.push("/dashboard");
      return true;
    } else {
      alert("Usuário ou senha incorretos");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
