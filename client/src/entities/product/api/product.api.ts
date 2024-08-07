import { AxiosPromise } from 'axios';
import { IProduct, IUpdateProductRequestParams } from '../model/product.types';
import { api } from 'shared/api';

const BASE_URL = '/products';

export const updateProductRequest = async (
  params: IUpdateProductRequestParams,
): AxiosPromise<IProduct> => {
  const response = await api.put(`${BASE_URL}/${params.updatedProduct._id}`, params.updatedProduct);
  return response;
};

export const getProductsRequest = async (): AxiosPromise<IProduct> => {
  const response = await api.get(`${BASE_URL}`);
  return response;
};

export const getProductsByCategoryRequest = async (category: string): AxiosPromise<IProduct[]> => {
  const response = api.post<IProduct[]>(`${BASE_URL}`, { category });
  return response;
};
