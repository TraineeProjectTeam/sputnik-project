import { Rule } from 'antd/es/form';
import { IAdress } from 'shared/ui/forms';

export interface IProfileCard {
  label: string;
  name: string;
  value?: string;
  rules?: Rule[];
}

export interface IUserProfile {
  readonly _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  company_name?: string;
  address?: IAdress;
}

export interface IProfileCardProps {
  title: string;
  user: IUserProfile;
  callback: (user: IUserProfile) => void;
}
