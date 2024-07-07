import { api } from '@/shared/api';
import { IUser } from '@/shared/libs/types';
import { updateUserProps } from '../model/types';

export const updateUserRequest = async (
  id: string | undefined,
  role: string | undefined,
  params: updateUserProps,
): Promise<IUser> => {
  const response = await api.put(`/${role}s/${id}`, params);
  return response.data;
};

export const getUserRequest = async (
  id: string | undefined,
  role: string | undefined,
): Promise<IUser> => {
  const response = await api.get(`/${role}s/${id}`);
  return response.data;
};
