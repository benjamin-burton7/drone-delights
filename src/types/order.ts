export type OrderItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id?: number;
  userId?: string | null;
  items: OrderItem[];
  total: number;
  date: string;
};

export type OrderInfo = {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  paymentMethod: "card" | "swish";
};