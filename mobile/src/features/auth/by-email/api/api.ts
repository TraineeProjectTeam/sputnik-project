import { IUserWithToken } from '@/entities/user';
import { api } from '@/shared/api';
import { AuthByEmailProps } from '../model/types';

export const AuthByEmail = async (params: AuthByEmailProps): Promise<IUserWithToken> => {
  const response = await api.post('/users/loginByEmail', params);
  return response.data;
};
