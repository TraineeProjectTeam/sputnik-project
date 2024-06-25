import { api } from 'shared/api';
import { IChangeVendorRequest } from '../model/vendor.types.ts';
import { AxiosPromise } from 'axios';
import { IVendor } from './vendor.dto.ts';

const BASE_URL = '/vendors';

export const changeVendorRequest = async (params: IChangeVendorRequest): AxiosPromise<IVendor> => {
  const response = await api.put(`${BASE_URL}/${params.user.id}`, params.user);
  return response.data;
};
