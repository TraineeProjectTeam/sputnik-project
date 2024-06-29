import { ICustomer } from 'entities/customer';
import { IVendor } from 'entities/vendor';

export interface ILoginEmailDetails {
  role: string;
  email: string;
  password: string;
}

export interface ILoginPhoneDetails {
  role: string;
  phone_number: string;
  password: string;
}

export interface IResponseLogin {
  user: ICustomer | IVendor;
  access_token: string;
}
