import { api } from '@/shared/api';
import { ICharacteristic, IFilters, IProduct } from '@/shared/libs/types';

export const getCategoriesRequest = async (): Promise<string[]> => {
  const response = await api.get(`/products/categories`);
  return response.data;
};

export const getProductsRequest = async (
  data: IFilters,
  page: number,
): Promise<{ products: IProduct[]; totalPages: number }> => {
  const response = await api.post(
    `/products/processed`,
    {
      ...data,
    },
    {
      params: {
        page: page,
        limit: 6,
      },
    },
  );
  return response.data;
};

export const getCharacteristicsRequest = async (
  category?: string,
): Promise<{ characteristics: ICharacteristic[]; prices: { max: number; min: number } }> => {
  const response = await api.post(`/products/characteristic`, { filters: { category } });
  return response.data;
};
