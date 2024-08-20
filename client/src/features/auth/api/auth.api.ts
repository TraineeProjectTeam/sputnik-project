import { api } from 'shared/api';
import {
  ILoginEmailDetails,
  ILoginPhoneDetails,
  IRegisterDetails,
  IResponseLogin,
  IResponseRegister,
} from '../model/auth.types';
import { AxiosPromise } from 'axios';

const BASE_URL = '/users';

export const registrationRequest = async (
  values: IRegisterDetails,
): AxiosPromise<IResponseRegister> => {
  const response = await api.post<IResponseRegister>(`${BASE_URL}/registration`, values);
  return response;
};

export const loginByPhoneRequest = async (
  loginDetails: ILoginPhoneDetails,
): AxiosPromise<IResponseLogin> => {
  const response = await api.post(`${BASE_URL}/loginByPhone`, loginDetails);
  return response;
};

export const loginByEmailRequest = async (
  loginDetails: ILoginEmailDetails,
): AxiosPromise<IResponseLogin> => {
  const response = await api.post(`${BASE_URL}/loginByEmail`, loginDetails);
  return response;
};
