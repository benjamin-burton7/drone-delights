// contexts/FavoriteContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

import { UserContext } from "./UserContext";
import { FavoriteService } from "../services/FavoriteService";

// Defines the structure of the favorite context
interface FavoriteContextType {
  favorites: number[]; // Array of favorite product IDs
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
}

// Create the context with default (non-functional) values
export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

// Provider component for managing favorite products
export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Access user state from UserContext
  const { user, isLoggedIn } = useContext(UserContext);

  // Load favorites whenever login state or user changes
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      const userFavorites = FavoriteService.getFavorites(user.id);
      setFavorites(userFavorites);
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn, user]);

  // Check if a product is marked as favorite
  const isFavorite = (productId: number): boolean =>
    favorites.includes(productId);

  // Add or remove a product from favorites
  const toggleFavorite = (productId: number) => {
    if (!isLoggedIn || !user?.id) return;

    const updated = FavoriteService.toggleFavorite(user.id, productId);
    setFavorites(updated);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
