import { create } from 'zustand';
import { IUser } from '@/shared/libs/types';

export interface IUserWithToken {
  user: IUser;
  access_token: string;
}

interface IUserStore extends IUserWithToken {
  role: string;
  setUser: (user: IUser, access_token: string, role: string) => void;
  reset: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: {} as IUser,
  access_token: '',
  role: '',
  setUser: (user, access_token, role) => {
    set({ user, access_token, role });
  },
  reset: () => set({ user: {} as IUser, access_token: '', role: '' }),
}));
