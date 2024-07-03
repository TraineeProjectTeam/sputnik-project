import { ICustomer } from 'entities/customer';
import { IVendor } from 'entities/vendor';

export interface ILoginEmailDetails {
  role: 'Customer' | 'Vendor';
  email: string;
  password: string;
}

export interface ILoginPhoneDetails {
  role: 'Customer' | 'Vendor';
  phone_number: string;
  password: string;
}

export interface IResponseLogin {
  user: ICustomer | IVendor;
  access_token: string;
}
