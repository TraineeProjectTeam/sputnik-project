import { create } from 'zustand';
import { ILoginEmailDetails, ILoginPhoneDetails, IResponseLogin } from './login.types';
import { api } from 'shared/api';
import { ICustomer, useCustomerStore } from 'entities/customer';
import { useVendorStore } from 'entities/vendor';
import { getCookiesUserData, saveAccessToken, saveRole, saveUserData } from 'shared/lib';
import Cookies from 'js-cookie';

export interface ILoginStore {
  loginPhone: (loginDetails: ILoginPhoneDetails) => Promise<IResponseLogin>;
  loginEmail: (loginDetails: ILoginEmailDetails) => Promise<IResponseLogin>;
  clearUserStores: () => void;
  user: ICustomer | null;
  error: string;
  loading: boolean;
  isLogin: Boolean;
  role: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setRole: (role: 'Customer' | 'Vendor') => void;
}

export const useLoginStore = create<ILoginStore>((set) => ({
  user: getCookiesUserData(),
  error: 'Не удалось совершить попытку входа! Пожалуйста, попробуйте еще раз.',
  loading: false,
  isLogin: Cookies.get('access_token') ? true : false,
  role: Cookies.get('role') || null,
  setIsLogin: (isLogin) => {
    set({ isLogin });
  },
  setRole: (role) => {
    set({ role });
  },
  clearUserStores: () => {
    useCustomerStore.getState().clearCustomer();
    useVendorStore.getState().clearVendor();
  },
  loginPhone: async (loginDetails) => {
    try {
      set({ loading: true });
      const { data } = await api.post<IResponseLogin>('/users/loginByPhone', loginDetails);
      set({ user: data.user });
      switch (loginDetails.role) {
        case 'Customer':
          useCustomerStore.getState().setCustomer(data.user, false);
          break;
        case 'Vendor':
          useVendorStore.getState().setVendor(data.user, false);
          break;
      }
      saveAccessToken(data.access_token);
      saveUserData(data.user);
      saveRole(loginDetails.role);
      set({ isLogin: true });
      set({ role: loginDetails.role });
      return data;
    } catch (error: any) {
      set({ user: null });
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  loginEmail: async (loginDetails: ILoginEmailDetails): Promise<IResponseLogin> => {
    try {
      set({ loading: true });
      const { data } = await api.post<IResponseLogin>('/users/loginByEmail', loginDetails);
      set({ user: data.user });
      switch (loginDetails.role) {
        case 'Customer':
          useCustomerStore.getState().setCustomer(data.user, false);
          break;
        case 'Vendor':
          useVendorStore.getState().setVendor(data.user, false);
          break;
      }
      saveAccessToken(data.access_token);
      saveUserData(data.user);
      saveRole(loginDetails.role);
      set({ isLogin: true });
      set({ role: loginDetails.role });
      return data;
    } catch (error: any) {
      set({ user: null });
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
