import { api } from 'shared/api';
import { IChangeVendorRequest } from '../model/vendor.types.ts';

const BASE_URL = '/vendors';

export const changeVendorRequest = async (params: IChangeVendorRequest) => {
  const response = await api.put(`${BASE_URL}/${params.user.id}`, params.user);
  return response.data;
};
