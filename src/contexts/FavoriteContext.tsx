import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import { FavoriteService } from "../services/FavoriteService";

// Defines the structure of the favorite context
interface FavoriteContextType {
  favorites: number[]; // Array of favorite product IDs
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
}

// Create context with default empty implementations
export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

// Provides favorite functionality to children components
export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Access user state from UserContext
  const { user, isLoggedIn } = useContext(UserContext);

  // Load favorites when user logs in or changes
  useEffect(() => {
    if (isLoggedIn && user) {
      const userFavorites = FavoriteService.getFavorites(user.id as number);
      setFavorites(userFavorites);
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn, user]);

  // Check if product is in favorites
  const isFavorite = (productId: number): boolean => {
    return favorites.includes(productId);
  };

  // Toggle favorite state for given product
  const toggleFavorite = (productId: number) => {
    if (!isLoggedIn || !user) return;

    const updatedFavorites = FavoriteService.toggleFavorite(
      user.id as number,
      productId
    );
    setFavorites(updatedFavorites);
  };

  // Expose favorite state and actions
  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
