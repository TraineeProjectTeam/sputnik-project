import { api } from '@/shared/api';
import { IProduct } from '@/shared/libs/types';
import { Pagination } from '../model/UseFavoriteStore';

export const getFavorites = async (
  page: number,
): Promise<{ products: IProduct[]; pagination: Pagination }> => {
  const response = await api.get('/favorites', {
    params: {
      page: page,
      pageSize: 6,
    },
  });
  return response.data;
};

export const addToFavorite = async (id: string): Promise<IProduct> => {
  const response = await api.post('/favorites', { product_id: id });
  return response.data;
};

export const deleteFavorite = async (id: string): Promise<IProduct> => {
  const response = await api.delete(`/favorites/${id}`);
  return response.data;
};
