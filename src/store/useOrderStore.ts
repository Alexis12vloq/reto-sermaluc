import { create } from "zustand";

interface Order {
  id: string;
  order_num: number;
  channel: string;
  created_at: string;
  customer_name: string;
}

interface OrderState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
}));