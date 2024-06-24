import { IVendor } from '../api/vendor.dto';

export interface IChangeVendorRequest {
  user: IVendor;
}

export interface IVendorStore {
  user: IVendor;
  setUser: (user: IVendor) => void;
}
