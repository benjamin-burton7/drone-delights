export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type CartSummaryProps = {
  cart: CartItem[];
  total: number;
  disableQuantityButtons?: boolean;
};

export type CartContextType = {
  cart: CartItem[];
  totalQuantity: number;
  updateItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  clearCart: () => void;
};

