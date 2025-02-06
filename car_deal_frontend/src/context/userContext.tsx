"use client";

import { TOKEN_COOKIE, USER_COOKIE } from "@/constants/common";
import { ISavedUser } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface AuthContextType {
  user: ISavedUser | null;
  token: string | null;
  login: (token: string, userData: ISavedUser) => void;
  logout: () => void;
  getAuthHeader: () => { Authorization: string } | Record<string, never>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<ISavedUser | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = Cookies.get(USER_COOKIE);
      const savedToken = Cookies.get(TOKEN_COOKIE);
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedToken) setToken(savedToken);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      Cookies.set(USER_COOKIE, JSON.stringify(user));
    } else {
      Cookies.remove(USER_COOKIE);
    }

    if (token) {
      Cookies.set(TOKEN_COOKIE, token);
    } else {
      Cookies.remove(TOKEN_COOKIE);
    }
  }, [user, token]);

  const login = useCallback(
    (newToken: string, userData: ISavedUser) => {
      setToken(newToken);
      setUser(userData);
      queryClient.setQueryData(["user"], userData);
    },
    [queryClient]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    Cookies.remove(USER_COOKIE);
    Cookies.remove(TOKEN_COOKIE);
    queryClient.setQueryData(["user"], null);
  }, [queryClient]);

  const getAuthHeader = useCallback((): { Authorization: string } | Record<string, never> => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        isLoading,
        logout,
        getAuthHeader
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context
}