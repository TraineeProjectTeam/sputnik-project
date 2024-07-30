import { create } from 'zustand';
import { IUser, Role } from '@/shared/libs/types';
import { storage } from '@/shared/libs/storage';

export interface IUserWithToken {
  user: IUser;
  access_token: string;
}

interface IUserStore extends Omit<IUserWithToken, 'access_token'> {
  setUser: (user: IUser, access_token: string, role: Role) => void;
  updateUser: (user: IUser) => void;
  reset: () => void;
  addToUserFavorite: (id: string) => void;
  deleteUserFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  user: {} as IUser,
  setUser: (user, access_token, role) => {
    set({ user });
    storage.set('access_token', access_token);
    storage.set('userId', user._id);
    storage.set('role', role);
  },
  updateUser: (user) => {
    set({ user });
  },
  reset: () => {
    set({ user: {} as IUser });
    storage.delete('access_token');
    storage.delete('userId');
    storage.delete('role');
  },
  addToUserFavorite: (id) => {
    set({
      user: {
        ...get().user,
        featured: [id, ...get().user.featured],
      },
    });
  },
  deleteUserFavorite: (id) => {
    set({
      user: {
        ...get().user,
        featured: get().user.featured.filter((productId) => productId !== id),
      },
    });
  },
  isFavorite: (id) => get().user.featured?.some((productId) => productId === id),
}));
