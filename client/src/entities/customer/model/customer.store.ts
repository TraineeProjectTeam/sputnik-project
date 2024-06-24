import { create } from 'zustand';
import { ICustomerStore } from './customer.types';
import { ICustomer } from '../api/cutomer.dto';

export const useCustomerStore = create<ICustomerStore>((set) => ({
  user: {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '+1234567890',
  },
  setUser: (user: ICustomer) => set({ user }),
}));
