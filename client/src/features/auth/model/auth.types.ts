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

export interface IRegisterDetails {
  role: 'Customer' | 'Vendor';
  first_name: string;
  last_name: string;
  phone_number: string;
  company_name?: string;
  email: string;
  password: string;
}

export interface IResponseRegister {
  user: ICustomer | IVendor;
  access_token: string;
}
