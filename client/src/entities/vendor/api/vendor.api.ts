import { api } from 'shared/api';
import { IChangeVendorRequest } from '../model/customer.types.ts';

const BASE_URL = '/vendors';

export const changeVendorRequest = async (params: IChangeVendorRequest) => {
  const response = await api.put(`${BASE_URL}/${params.id}`, params.user);
  return response.data;
};
