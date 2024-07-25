import { create } from 'zustand';
import { ICustomer } from '../api/cutomer.dto';
import { changeCustomerRequest } from '../api/customer.api';
import { getCookiesUserData } from 'shared/lib';

export interface ICustomerStore {
  user: ICustomer | null;
  setCustomer: (user: ICustomer, isUpdate: boolean) => void;
  clearCustomer: () => void;
}

export const useCustomerStore = create<ICustomerStore>((set) => ({
  user: getCookiesUserData(),
  setCustomer: (user: ICustomer, isUpdate: boolean) => {
    set({ user });
    isUpdate && changeCustomerRequest({ user });
  },
  clearCustomer: () => {
    set({ user: null });
  },
}));
