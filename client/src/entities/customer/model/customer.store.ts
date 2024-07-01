import { create } from 'zustand';
import { ICustomer } from '../api/cutomer.dto';
import { changeCustomerRequest } from '../api/customer.api';

export interface ICustomerStore {
  user: ICustomer;
  setCustomer: (user: ICustomer, isUpdate: boolean) => void;
}

export const useCustomerStore = create<ICustomerStore>((set) => ({
  user: {
    _id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
  },
  setCustomer: (user: ICustomer, isUpdate: boolean) => {
    set({ user });
    isUpdate && changeCustomerRequest({ user });
  },
}));
