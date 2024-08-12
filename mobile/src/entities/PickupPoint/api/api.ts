import { api } from '@/shared/api';
import { IPickupPoint } from '@/shared/libs/types';

export const getPickupPoints = async (): Promise<IPickupPoint[]> => {
  const response = await api.get('/pickup-points');
  return response.data;
};
