// hooks/useFavoriteProducts.ts
import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { UserContext } from "../contexts/UserContext";
import { ProductService } from "../services/ProductService";
import type { Product } from "../types/product";

// Custom hook that fetches full product data for the user's favorite product IDs
export function useFavoriteProducts() {
  const { favorites } = useContext(FavoriteContext);
  const { isLoggedIn } = useContext(UserContext);

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!isLoggedIn || favorites.length === 0) {
        setFavoriteProducts([]);
        return;
      }

      const allProducts = await ProductService.fetchProducts();
      const matched = allProducts.filter((p) => favorites.includes(p.id));
      setFavoriteProducts(matched);
    };

    load();
  }, [favorites, isLoggedIn]);

  return favoriteProducts;
}
