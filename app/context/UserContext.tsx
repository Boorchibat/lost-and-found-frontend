"use client";

import { getSingleUser } from "@/lib/auth/getUser";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface User {
  _id: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setToken(storedToken);

        getSingleUser<User>(parsedUser._id)
          .then((fetchedUser) => {
            if (fetchedUser) {
              setUser(fetchedUser);
              localStorage.setItem("user", JSON.stringify(fetchedUser));
            } else {
              setUser(null);
              setToken(null);
              localStorage.removeItem("user");
              localStorage.removeItem("token");
            }
          })
          .catch(() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          })
          .finally(() => setLoading(false));
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setLoading(false);
      }
    } else {
      setUser(null);
      setToken(null);
      setLoading(false);
    }
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
