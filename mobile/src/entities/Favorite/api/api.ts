import { api } from '@/shared/api';
import { IPagination, IProduct } from '@/shared/libs/types';

export const getFavorites = async (
  page: number,
): Promise<{ products: IProduct[]; pagination: IPagination }> => {
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
