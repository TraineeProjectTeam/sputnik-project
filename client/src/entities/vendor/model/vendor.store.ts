import { create } from 'zustand';
import { IVendor } from '../api/vendor.dto';
import { changeVendorRequest } from '../api/vendor.api';
import { getCookiesUserData } from 'shared/lib';

export interface IVendorStore {
  user: IVendor | null;
  setVendor: (user: IVendor, isUpdate: boolean) => void;
  clearVendor: () => void;
}

export const useVendorStore = create<IVendorStore>((set) => ({
  user: getCookiesUserData(),
  setVendor: (user: IVendor, isUpdate: boolean) => {
    set({ user });
    isUpdate && changeVendorRequest({ user });
  },
  clearVendor: () => {
    set({ user: null });
  },
}));
