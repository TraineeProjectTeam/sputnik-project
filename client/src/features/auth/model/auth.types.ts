import { ICustomer } from 'entities/customer';
import { IVendor } from 'entities/vendor';
import { TypeRole } from 'shared/config';
import { IAdress } from 'shared/ui/forms';

export interface ILoginEmailDetails {
  role: TypeRole;
  email: string;
  password: string;
}

export interface ILoginPhoneDetails {
  role: TypeRole;
  phone_number: string;
  password: string;
}

export interface IResponseLogin {
  user: ICustomer | IVendor;
  access_token: string;
}

export interface IRegisterDetails {
  role: TypeRole;
  first_name: string;
  last_name: string;
  phone_number: string;
  company_name?: string;
  email: string;
  password: string;
  address?: IAdress;
}

export interface IRegisterFormValues {
  role: TypeRole;
  first_name: string;
  last_name: string;
  phone_number: string;
  company_name?: string;
  email: string;
  password: string;
  region?: string;
  city?: string;
  street_name?: string;
  street_number?: string;
}

export interface IResponseRegister {
  user: ICustomer | IVendor;
  access_token: string;
}
