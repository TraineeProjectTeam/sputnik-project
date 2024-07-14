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
  setOrders: (orders: IOrder[]) => {
    set({ orders });
    getOrdersRequest();
  },
  deleteOrder: (id: string) => {
    set((state) => ({
      orders: state.orders.filter((order) => order.customer_id !== id),
    }));
    deleteOrderRequest({ id });
  },
  addOrder: (order: IOrder) => {
    set((state) => ({
      orders: [...state.orders, order],
    }));
    addOrderRequest({ order });
  },
  updateOrder: (updatedOrder: IOrder) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.customer_id === updatedOrder.customer_id ? updatedOrder : order,
      ),
    }));
    updateOrderRequest({ order: updatedOrder });
  },
}));
