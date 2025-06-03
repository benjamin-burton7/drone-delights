// contexts/UserContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";

import { UserService } from "../services/UserService";
import type { User } from "../types/user";

// Defines the shape of the user context
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

// Create context with default no-op values
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  logout: () => {},
});

// Provider component that manages and exposes user authentication state
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Derived value to determine if a user is logged in
  const isLoggedIn = !!user;

  // Load current user from persistent storage when component mounts
  useEffect(() => {
    const currentUser = UserService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Clear user state and session data
  const logout = () => {
    setUser(null);
    UserService.logout();
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
