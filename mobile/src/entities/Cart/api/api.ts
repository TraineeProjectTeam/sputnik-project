import { api } from '@/shared/api';
import { IProduct, OrderProduct, Pagination } from '@/shared/libs/types';

export const getCartProduct = async (
  page: number,
): Promise<{ products: OrderProduct[]; pagination: Pagination }> => {
  const response = await api.get('/cart', {
    params: {
      page: page,
      pageSize: 6,
    },
  });
  return response.data;
};

export const addToCart = async (id: string): Promise<OrderProduct> => {
  const response = await api.post('/cart', { product_id: id });
  return response.data;
};

export const updateQuantityProduct = async (
  id: string,
  quantity: number,
): Promise<OrderProduct> => {
  const response = await api.put(`/cart/${id}`, { quantity });
  return response.data;
};

export const deleteProductInCart = async (id: string): Promise<IProduct> => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};
