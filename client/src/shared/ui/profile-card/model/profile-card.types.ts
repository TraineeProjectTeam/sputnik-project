interface IAddress {
  region: string;
  city: string;
  street_name: string;
  street_number: string;
}

export interface IUserProfile {
  readonly id: string;
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
