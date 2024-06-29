import { create } from 'zustand';
import { IUser, Role } from '@/shared/libs/types';
import { storage } from '@/shared/libs/storage';

export interface IUserWithToken {
  user: IUser;
  access_token: string;
}

interface IUserStore extends Omit<IUserWithToken, 'access_token'> {
  role: Role;
  setUser: (user: IUser, access_token: string, role: Role) => void;
  reset: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: {} as IUser,
  role: '' as Role,
  setUser: (user, access_token, role) => {
    set({ user, role });
    storage.set('access_token', access_token);
    storage.set('userId', user.id);
  },
  reset: () => {
    set({ user: {} as IUser, role: '' as Role });
    storage.delete('access_token');
  },
}));
