import { create } from 'zustand';
import { IMapStore } from './map.types';
import { getPickupPointsRequest } from '../api/map.api';

export const useMapStore = create<IMapStore>((set) => ({
  pickupPoints: [
    {
      address: {
        region: 'Россия',
        city: 'Томск',
        street_name: 'Карповский пер.',
        street_number: '12',
      },
      latitude: '56.499435',
      logitude: '84.949077',
    },
  ],
  isLoading: false,
  getPickupPoints: async () => {
    try {
      set({ isLoading: true });
      const response = await getPickupPointsRequest();
      set({ pickupPoints: response.data });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
