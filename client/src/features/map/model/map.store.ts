import { create } from 'zustand';
import { IMapStore } from './map.types';
import { getPickupPointRequest, getPickupPointsRequest } from '../api/map.api';

export const useMapStore = create<IMapStore>((set) => ({
  pickupPoint: {
    address: {
      region: 'Россия',
      city: 'Томск',
      street_name: 'Карповский пер.',
      street_number: '12',
    },
    latitude: '56.499435',
    logitude: '84.949077',
  },
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
  getPickupPoint: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await getPickupPointRequest(id);
      set({ pickupPoint: response.data });
    } catch (error: any) {
      set({ pickupPoint: null });
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
