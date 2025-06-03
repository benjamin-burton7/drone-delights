import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { UserContext } from "../contexts/UserContext";
import { ProductService } from "../services/ProductService";
import type { Product } from "../types/product";

// Custom hook for retrieving the full product data of the user's favorites
export function useFavoriteProducts() {

  const { favorites } = useContext(FavoriteContext);
  const { isLoggedIn } = useContext(UserContext);

  // Local state to hold full product data for favorite items
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadFavoriteProducts = async () => {
      // If user is not logged in or has no favorites, return empty list
      if (!isLoggedIn || favorites.length === 0) {
        setFavoriteProducts([]);
        return;
      }

      // Fetch all products and filter by favorite IDs
      const allProducts = await ProductService.fetchProducts();
      const filtered = allProducts.filter((p) => favorites.includes(p.id));
      setFavoriteProducts(filtered);
    };

    loadFavoriteProducts();
  }, [favorites, isLoggedIn]);

  return favoriteProducts;
}
