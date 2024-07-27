import { create } from 'zustand';
import { IOrder, IOrdersStore } from './order.types';
import {
  deleteOrderRequest,
  getOrdersRequest,
  updateOrderRequest,
  addOrderRequest,
  getOrderRequest,
} from '../api/order.api';
import { EnumStatus } from 'shared/ui/buttons';

export const useOrdersStore = create<IOrdersStore>((set, get) => ({
  order: null,
  orders: [],
  filtredStatus: EnumStatus.all,
  isLoading: false,
  isLoadingOrder: false,
  getOrder: async (id: string) => {
    try {
      set({ isLoadingOrder: true });
      const response = await getOrderRequest(id);
      set({ order: response.data });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isLoadingOrder: false });
    }
  },
  getOrders: async () => {
    try {
      set({ isLoading: true });
      const response = await getOrdersRequest();
      set({ orders: response.data });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  setOrdredStatus: (status: EnumStatus) => {
    set({ filtredStatus: status });
  },
  deleteOrder: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await deleteOrderRequest({ id });
      set({
        orders: get().orders.filter((order) => order.customer_id !== response.data.customer_id),
      });
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
      set({
        orders: [...get().orders, response.data],
      });
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
      set({
        orders: get().orders.map((order) =>
          order.customer_id === updatedOrder.customer_id ? response.data : order,
        ),
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
