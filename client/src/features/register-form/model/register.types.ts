import { ICustomer } from 'entities/customer';
import { IVendor } from 'entities/vendor';

export interface IRegisterDetails {
  role: 'Customer' | 'Vendor';
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
}

export interface IResponseRegister {
  user: ICustomer | IVendor;
  access_token: string;
}
