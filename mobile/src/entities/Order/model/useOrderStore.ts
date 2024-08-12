import { ICartProduct, IOrder } from '@/shared/libs/types';
import { create } from 'zustand';
import { createOrder, getOrders, updateStatusOrder } from '../api/api';

export interface ICreateOrder {
  status: string;
  order_date: Date;
  estimated_delivery_date: Date;
  delivery_date: Date;
  price: number;
  pickup_point: string;
  products: ICartProduct[];
}

interface IUseOrderStore {
  isLoading: boolean;
  orders: IOrder[];
  getOrders: () => Promise<IOrder[]>;
  createOrder: (order: ICreateOrder) => Promise<IOrder>;
  updateStatusOrder: (id: string, status: string) => Promise<IOrder>;
}

export const useOrderStore = create<IUseOrderStore>((set, get) => ({
  isLoading: false,
  orders: [],
  getOrders: async () => {
    try {
      set({ isLoading: true });
      const data = await getOrders();
      set({ orders: data });
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
  createOrder: async (order) => {
    try {
      const data = await createOrder(order);
      return data;
    } catch {
      throw new Error();
    }
  },
  updateStatusOrder: async (id, status) => {
    try {
      const data = await updateStatusOrder(id, status);
      set({
        orders: get().orders.map((order) =>
          order._id === data._id ? { ...order, status: data.status } : order,
        ),
      });
      return data;
    } catch {
      throw new Error();
    }
  },
}));
