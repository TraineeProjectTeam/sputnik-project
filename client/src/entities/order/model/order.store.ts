import { create } from 'zustand';
import { IOrder, IOrdersStore } from './order.types';
import {
  deleteOrderRequest,
  getOrdersRequest,
  updateOrderRequest,
  addOrderRequest,
} from '../api/order.api';

export const useOrdersStore = create<IOrdersStore>((set) => ({
  orders: [],
  isLoading: false,
  getOrders: async () => {
    try {
      set({ isLoading: true });
      const response = await getOrdersRequest();
      set({ orders: response });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteOrder: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await deleteOrderRequest({ id });
      set((state) => ({
        orders: state.orders.filter((order) => order.customer_id !== response.customer_id),
      }));
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  addOrder: async (order: IOrder) => {
    try {
      set({ isLoading: true });
      const response = await addOrderRequest({ order });
      set((state) => ({
        orders: [...state.orders, response],
      }));
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  updateOrder: async (updatedOrder: IOrder) => {
    try {
      set({ isLoading: true });
      const response = await updateOrderRequest({ order: updatedOrder });
      set((state) => ({
        orders: state.orders.map((order) =>
          order.customer_id === updatedOrder.customer_id ? response : order,
        ),
      }));
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
