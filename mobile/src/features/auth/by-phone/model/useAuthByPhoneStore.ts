import { create } from 'zustand';

import { AuthByPhoneProps } from './types';
import { AuthByPhone } from '../api/api';
import { IUserWithToken, useUserStore } from '@/entities/user';
import { useCartStore } from '@/entities/Cart';
import { useFavoriteStore } from '@/entities/Favorite';

interface IAuthByPhoneStore {
  isLoading: boolean;
  authByPhone: (formData: AuthByPhoneProps) => Promise<IUserWithToken>;
}

export const useAuthByPhoneStore = create<IAuthByPhoneStore>((set) => ({
  isLoading: false,
  authByPhone: async (formData) => {
    try {
      set({ isLoading: true });
      const data = await AuthByPhone(formData);
      useUserStore.getState().setUser(data.user, data.access_token, formData.role);
      useCartStore.getState().setProductsIds(data.user.cart);
      useFavoriteStore.getState().setFavoriteIds(data.user.featured);
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
}));
