import { create } from 'zustand';

import { useUserStore } from '@/entities/user';

import { storage } from '@/shared/libs/storage';
import { IUser } from '@/shared/libs/types';

import { updateUserProps } from './types';
import { updateUserRequest, getUserRequest } from '../api/api';

interface IUseFormStore {
  isLoading: boolean;
  updateUser: (formData: updateUserProps) => Promise<IUser>;
  getUser: () => Promise<IUser>;
}

const role = storage.getString('role');
const userId = storage.getString('userId');

export const useUserFormStore = create<IUseFormStore>((set) => ({
  isLoading: false,
  updateUser: async (formData) => {
    try {
      set({ isLoading: true });
      const data = await updateUserRequest(formData, userId, role);
      useUserStore.getState().updateUser(data);
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
  getUser: async () => {
    try {
      set({ isLoading: true });
      const data = await getUserRequest(userId, role);
      useUserStore.getState().updateUser(data);
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
}));
