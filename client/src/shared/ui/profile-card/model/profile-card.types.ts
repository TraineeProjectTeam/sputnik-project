import { Rule } from 'antd/es/form';

interface IAddress {
  region: string;
  city: string;
  street_name: string;
  street_number: string;
}

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
  address?: IAddress;
}

export interface IProfileCardProps {
  title: string;
  user: IUserProfile;
  callback: (user: IUserProfile) => void;
}
