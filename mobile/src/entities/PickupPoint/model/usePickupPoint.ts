import { create } from 'zustand';
import { IPickupPoint } from '@/shared/libs/types';
import { getPickupPoints } from '../api/api';

interface IUsePickupPointStore {
  isLoading: boolean;
  pickupPoints: IPickupPoint[];
  getPickupPoints: () => Promise<IPickupPoint[]>;
}

export const usePickupPointStore = create<IUsePickupPointStore>((set) => ({
  isLoading: false,
  pickupPoints: [],
  getPickupPoints: async () => {
    try {
      set({ isLoading: true });
      const data = await getPickupPoints();
      set({ pickupPoints: data });
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
}));
