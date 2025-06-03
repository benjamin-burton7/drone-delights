export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  };

  export type ProductCardVariant = "grid" | "list";

  export interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    variant?: "grid" | "list";
    quantity?: number;
    disableQuantityButtons?: boolean;
    showFavoriteButton?: boolean; // Lägg till denna rad
  }
  