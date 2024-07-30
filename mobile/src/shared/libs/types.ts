export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  company_name?: string;
  createdAt: Date;
  reviews: string[];
  featured: string[];
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  rating: number;
  thumbnail: string;
  remaining: number;
  reviews_count: number;
  tags: string[];
  images: string[];
  reviews: string[];
  characteristic: string[];
}

export interface IOrder {
  id: number;
  status: string;
  orderData: Date;
  estimatedDeliveryDate: Date;
  deliveryDate: Date;
  price: number;
}

export interface IReview {
  _id: string;
  customer_id: string;
  product_id: {
    name: string;
    thumbnail: string;
  };
  customer_fullname: string;
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

export interface IUpdateReview {
  body: string;
  rating: number;
}
