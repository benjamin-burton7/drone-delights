import { useEffect, useState } from "react";
import { ProductService } from "../services/ProductService";
import type { Product } from "../types/product";

// Custom hook to retrieve a fixed set of "popular" products by ID
export function usePopularProducts() {
  // Local state to store the fetched popular products
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  // Fetch products once when the hook is mounted
  useEffect(() => {
    const loadPopular = async () => {
      // Fetch all available products
      const allProducts = await ProductService.fetchProducts();

      // List of popular product
      const popularIds = ["1", "19", "17", "22"];

      // Filter matching products by ID
      const top4 = ProductService.getProductsByIds(allProducts, popularIds);

      // Update local state with filtered products
      setPopularProducts(top4);
    };

    loadPopular();
  }, []);

  return popularProducts;
}
