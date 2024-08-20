import { ICustomer } from 'entities/customer';
import { IVendor } from 'entities/vendor';
import { TypeRole } from 'shared/config';

export interface IRegisterDetails {
  role: TypeRole;
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
