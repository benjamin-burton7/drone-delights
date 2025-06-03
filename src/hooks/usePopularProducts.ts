// hooks/usePopularProducts.ts
import { useEffect, useState } from "react";
import { ProductService } from "../services/ProductService";
import type { Product } from "../types/product";

// Custom hook to fetch a predefined list of popular products
export function usePopularProducts() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadPopular = async () => {
      try {
        // Fetch all available products from the service
        const allProducts = await ProductService.fetchProducts();

        // Define popular product IDs
        const popularIds = ["1", "19", "17", "22"];

        // Filter products matching the popular IDs
        const filtered = ProductService.getProductsByIds(
          allProducts,
          popularIds
        );

        // Update local state
        setPopularProducts(filtered);
      } catch (error) {
        console.error("Failed to load popular products:", error);
      }
    };

    loadPopular();
  }, []);

  // Return the filtered popular products
  return popularProducts;
}
