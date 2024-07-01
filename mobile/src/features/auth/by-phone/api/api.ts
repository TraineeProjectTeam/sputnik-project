import { IUserWithToken } from '@/entities/user';
import { api } from '@/shared/api';
import { AuthByPhoneProps } from '../model/types';

export const AuthByPhone = async (params: AuthByPhoneProps): Promise<IUserWithToken> => {
  const response = await api.post('/users/loginByPhone', params);
  return response.data;
};
