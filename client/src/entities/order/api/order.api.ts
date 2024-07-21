import { api } from 'shared/api';
import {
  IAddOrderRequestParams,
  IDeleteOrderRequestParams,
  IOrder,
  IUpdateOrderRequestParams,
} from '../model/order.types';
import { AxiosPromise } from 'axios';

const BASE_URL = '/orders';

export const getOrdersRequest = async (): AxiosPromise<IOrder[]> => {
  const response = await api.get(`${BASE_URL}`);
  return response;
};

export const updateOrderRequest = async (
  params: IUpdateOrderRequestParams,
): AxiosPromise<IOrder> => {
  const response = await api.put(`${BASE_URL}/${params.order.customer_id}`, params.order);
  return response;
};

export const deleteOrderRequest = async (
  params: IDeleteOrderRequestParams,
): AxiosPromise<IOrder> => {
  const response = await api.delete(`${BASE_URL}/${params.id}`);
  return response;
};

export const addOrderRequest = async (params: IAddOrderRequestParams): AxiosPromise<IOrder> => {
  const response = await api.post(`${BASE_URL}`, params);
  return response;
};
