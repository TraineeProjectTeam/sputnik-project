import { create } from 'zustand';
import { IVendor } from '../api/vendor.dto';
import { changeVendorRequest } from '../api/vendor.api';

export interface IVendorStore {
  user: IVendor;
  setUser: (user: IVendor) => void;
}

export const useVendorStore = create<IVendorStore>((set) => ({
  user: {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    company_name: 'Doe Enterprises',
    phone_number: '+1234567890',
    address: {
      region: 'California',
      city: 'Los Angeles',
      street_name: 'Sunset Blvd',
      street_number: '1234',
    },
  },
  setUser: (user: IVendor) => {
    set({ user });
    changeVendorRequest({ user });
  },
}));
