// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  memberId: string;
  nickname: string;
  profileImg: string;
}

interface AuthContextType {
  decodedToken: JwtPayload | null;
  setDecodedToken: (token: JwtPayload | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);

  return (
    <AuthContext.Provider value={{ decodedToken, setDecodedToken }}>
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
