import { Rule } from 'antd/es/form';
import { ICustomer } from 'entities/customer';
import { IVendor } from 'entities/vendor';

export interface IProfileCard {
  label: string;
  name: string;
  value?: string;
  rules: Rule[];
}

export interface IProfileCardProps {
  title: string;
  user: IVendor | ICustomer;
  callback: (user: IVendor | ICustomer) => void;
}
