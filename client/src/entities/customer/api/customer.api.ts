import { api } from 'shared/api';
import { IChangeCustomerRequest } from '../model/customer.types';

const BASE_URL = '/customers';

export const changeCustomerRequest = async (params: IChangeCustomerRequest) => {
  const response = await api.put(`${BASE_URL}/${params.user.id}`, params.user);
  return response.data;
};
