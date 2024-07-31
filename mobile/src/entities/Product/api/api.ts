import { api } from '@/shared/api';
import { IProduct } from '@/shared/libs/types';

export const getProductsRequest = async (): Promise<IProduct[]> => {
  const response = await api.get(`/products`);
  return response.data;
};
