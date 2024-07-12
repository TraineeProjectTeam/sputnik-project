import { api } from 'shared/api';
import {
  IDeleteOrderRequestParams,
  IGetOrderByIdRequestParams,
  IOrder,
  IUpdateOrderRequestParams,
} from '../model/order.types';
import { AxiosPromise } from 'axios';

const BASE_URL = '/orders';

export const getOrdersRequest = async (): AxiosPromise<IOrder[]> => {
  const response = await api.get(`${BASE_URL}`);
  return response.data;
};

export const updateOrderRequest = async (
  params: IUpdateOrderRequestParams,
): AxiosPromise<IOrder> => {
  const response = await api.put(`${BASE_URL}/${params.id}`, params.order);
  return response.data;
};

export const deleteOrderRequest = async (
  params: IDeleteOrderRequestParams,
): AxiosPromise<IOrder> => {
  const response = await api.delete(`${BASE_URL}/${params.id}`);
  return response.data;
};

export const getOrderByRequest = async (
  params: IGetOrderByIdRequestParams,
): AxiosPromise<IOrder> => {
  const response = await api.get(`${BASE_URL}/${params.id}`);
  return response.data;
};
