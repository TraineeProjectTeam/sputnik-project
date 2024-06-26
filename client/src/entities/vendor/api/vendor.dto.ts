interface IAdress {
  region: string;
  city: string;
  street_name: string;
  street_number: string;
}

export interface IVendor {
  readonly id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  phone_number: string;
  address: IAdress;
}
