import { api } from 'shared/api';
import { IChangeCustomerRequest } from '../model/customer.types';
import { ICustomer } from './cutomer.dto';
import { AxiosPromise } from 'axios';

const BASE_URL = '/customers';

export const changeCustomerRequest = async (
  params: IChangeCustomerRequest,
): AxiosPromise<ICustomer> => {
  const response = await api.put(`${BASE_URL}/${params.user.id}`, params.user);
  return response.data;
};
