import { IVendor } from '../api/vendor.dto';

export interface IChangeVendorRequest {
  user: Omit<IVendor, 'id'>;
  id: number;
}
