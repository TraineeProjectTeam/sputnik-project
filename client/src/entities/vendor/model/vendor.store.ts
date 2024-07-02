import { create } from 'zustand';
import { IVendor } from '../api/vendor.dto';
import { changeVendorRequest } from '../api/vendor.api';
import { getCookiesUserData } from 'shared/lib';

export interface IVendorStore {
  user: IVendor;
  setVendor: (user: IVendor, isUpdate: boolean) => void;
}

export const useVendorStore = create<IVendorStore>((set) => ({
  user: getCookiesUserData(),
  setVendor: (user: IVendor, isUpdate: boolean) => {
    set({ user });
    isUpdate && changeVendorRequest({ user });
  },
}));
