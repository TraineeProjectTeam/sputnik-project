import { IUserWithToken } from '@/entities/user';
import { api } from '@/shared/api';
import { RegistrationProps } from '../model/types';

export const registration = async (params: RegistrationProps): Promise<IUserWithToken> => {
  const response = await api.post('/users/registration', params);
  return response.data;
};
