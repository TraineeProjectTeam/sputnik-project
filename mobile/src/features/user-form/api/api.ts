import { api } from '@/shared/api';
import { IUser } from '@/shared/libs/types';
import { updateUserProps } from '../model/types';

export const updateUserRequest = async (
  params: updateUserProps,
  id?: string,
  role?: string,
): Promise<IUser> => {
  const response = await api.put(`/${role}s/${id}`, params);
  return response.data;
};

export const getUserRequest = async (id?: string, role?: string): Promise<IUser> => {
  const response = await api.get(`/${role}s/${id}`);
  return response.data;
};
