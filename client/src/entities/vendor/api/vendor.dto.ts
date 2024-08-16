import { IAdress } from 'shared/ui/forms';

export interface IVendor {
  readonly _id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name?: string;
  phone_number: string;
  address?: IAdress;
}
