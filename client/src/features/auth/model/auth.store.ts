import { create } from 'zustand';
import { ICustomer, useCustomerStore } from 'entities/customer';
import { useVendorStore } from 'entities/vendor';
import { getCookiesUserData, saveAccessToken, saveRole, saveUserData } from 'shared/lib';
import Cookies from 'js-cookie';
import { ILoginEmailDetails, ILoginPhoneDetails } from './auth.types';
import { loginByEmailRequest, loginByPhoneRequest } from '../api/auth.api';
import { TypeRole } from 'shared/config';

export interface ILoginStore {
  loginPhone: (loginDetails: ILoginPhoneDetails) => void;
  loginEmail: (loginDetails: ILoginEmailDetails) => void;
  clearUserStores: () => void;
  user: ICustomer | null;
  error: string;
  loading: boolean;
  isLogin: boolean;
  role: TypeRole | null;
  setIsLogin: (isLogin: boolean) => void;
  setRole: (role: TypeRole) => void;
}

export const useLoginStore = create<ILoginStore>((set) => ({
  user: getCookiesUserData(),
  error: 'Не удалось совершить попытку входа! Пожалуйста, попробуйте еще раз.',
  loading: false,
  isLogin: Cookies.get('access_token') ? true : false,
  role: (Cookies.get('role') as TypeRole) || null,
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
      const data = (await loginByPhoneRequest(loginDetails)).data;
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
    } catch (error: any) {
      set({ user: null });
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  loginEmail: async (loginDetails: ILoginEmailDetails) => {
    try {
      set({ loading: true });
      const data = (await loginByEmailRequest(loginDetails)).data;
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
    } catch (error: any) {
      set({ user: null });
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
