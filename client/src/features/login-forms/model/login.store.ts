import { create } from 'zustand';
import { ILoginEmailDetails, ILoginPhoneDetails, IResponseLogin } from './login.types';
import { api } from 'shared/api';
import { ICustomer, useCustomerStore } from 'entities/customer';
import { useVendorStore } from 'entities/vendor';
import { saveAccessToken } from '../api/login.api';

export interface ILoginStore {
  loginPhone: (loginDetails: ILoginPhoneDetails) => Promise<IResponseLogin>;
  loginEmail: (loginDetails: ILoginEmailDetails) => Promise<IResponseLogin>;
  user: ICustomer | null;
  error: string;
  loading: boolean;
}

const useLoginStore = create<ILoginStore>((set) => ({
  user: null,
  error: 'Не удалось совершить попытку входа! Пожалуйста, попробуйте еще раз.',
  loading: false,
  loginPhone: async (loginDetails) => {
    try {
      set({ loading: true });
      const { data } = await api.post<IResponseLogin>('/users/loginByPhone', loginDetails);
      set({ user: data.user });
      switch (loginDetails.role) {
        case 'Customer':
          useCustomerStore.getState().setUser(data.user);
          break;
        case 'Vendor':
          useVendorStore.getState().setUser(data.user);
          break;
      }
      saveAccessToken(data.access_token);
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
          useCustomerStore.getState().setUser(data.user);
          break;
        case 'Vendor':
          useVendorStore.getState().setUser(data.user);
          break;
      }
      saveAccessToken(data.access_token);
      return data;
    } catch (error: any) {
      set({ user: null });
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLoginStore;
