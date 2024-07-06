import { create } from 'zustand';

import { AuthByEmailProps } from './types';
import { AuthByEmail } from '../api/api';
import { IUserWithToken, useUserStore } from '@/entities/user';

interface IAuthByEmailStore {
  isLoading: boolean;
  authByEmail: (formData: AuthByEmailProps) => Promise<IUserWithToken>;
}

export const useAuthByEmailStore = create<IAuthByEmailStore>((set) => ({
  isLoading: false,
  authByEmail: async (formData) => {
    try {
      set({ isLoading: true });
      const data = await AuthByEmail(formData);
      useUserStore.getState().setUser(data.user, data.access_token, formData.role);
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
}));
