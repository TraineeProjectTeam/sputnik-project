import { create } from 'zustand';

import { RegistrationProps } from './types';
import { registration } from '../api/api';
import { IUserWithToken, useUserStore } from '@/entities/user';

interface IRegistrationStore {
  isLoading: boolean;
  registration: (formData: RegistrationProps) => Promise<IUserWithToken>;
}

export const useRegistrationStore = create<IRegistrationStore>((set) => ({
  isLoading: false,
  registration: async (formData) => {
    try {
      set({ isLoading: true });
      const data = await registration(formData);
      useUserStore.getState().setUser(data.user, data.access_token, formData.role);
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
}));
