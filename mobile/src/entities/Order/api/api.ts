import { api } from '@/shared/api';
import { IOrder, Role } from '@/shared/libs/types';
import { ICreateOrder } from '../model/useOrderStore';

export const getOrders = async (): Promise<IOrder[]> => {
  const response = await api.get('/orders');
  return response.data;
};

export const createOrder = async (data: ICreateOrder): Promise<IOrder> => {
  const response = await api.post('/orders', { ...data });
  return response.data;
};

export const updateStatusOrder = async (id: string, status: string): Promise<IOrder> => {
  const response = await api.put(`/orders/${id}`, { status, role: Role.CUSTOMER });
  return response.data;
};
