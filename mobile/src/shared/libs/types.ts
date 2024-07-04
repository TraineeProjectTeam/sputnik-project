export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  company_name?: string;
  address?: IAddress;
  createdAt: Date;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  rating: number;
  thumbnail: string;
  tags: string[];
  imagesUrl: string[];
}

export interface IOrder {
  id: number;
  status: string;
  orderData: Date;
  estimatedDeliveryDate: Date;
  deliveryDate: Date;
  price: number;
}

export interface IVendors {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  companyName: string;
  address: IAddress;
}

export interface IReview {
  customerFullName: string;
  rating: number;
  body: string;
}

export interface IAddress {
  region: string;
  city: string;
  streetName: string;
  streetNumber: string;
}

export interface IPickupPoint {
  id: number;
  address: IAddress;
  longitude: string;
  latitude: string;
}

export enum Role {
  CUSTOMER = 'Customer',
  VENDOR = 'Vendor',
}
