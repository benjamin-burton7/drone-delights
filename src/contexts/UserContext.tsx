import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserService } from "../services/UserService";
import type { User } from "../types/user";

// Defines the structure of the context that holds user data and auth actions
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

// Create context with default (non-functional) values
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  logout: () => {},
});

// Provides user authentication state and methods to its children
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Internal user state
  const [user, setUser] = useState<User | null>(null);

  // Derived value for login status
  const isLoggedIn = !!user;

  // On mount, attempt to load current user from persistent storage
  useEffect(() => {
    const currentUser = UserService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Clear user state and session
  const logout = () => {
    setUser(null);
    UserService.logout();
  };

  // Provide user data and auth actions to the component tree
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
