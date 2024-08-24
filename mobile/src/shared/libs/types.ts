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
  cart: { product: string; quantity: number }[];
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
  readonly _id: string;
  customer_id: IUser;
  status: OrderStatus;
  order_date: Date;
  estimated_delivery_date: Date;
  delivery_date: Date;
  price: number;
  pickup_point: IPickupPoint;
  products: IOrderProduct[];
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
  street_name: string;
  street_number: string;
}

export interface IPickupPoint {
  _id: string;
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

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IOrderProduct {
  product: IProduct;
  quantity: number;
}

export interface ICartProduct {
  product: string;
  quantity: number;
}

export interface IFilters {
  category?: string;
  characteristics: ICharacteristic[];
  rating?: number;
  min: number;
  max: number;
  order?: string;
  sortBy?: string;
}

export interface ICharacteristic {
  values: string[];
  characteristic: string;
}

export enum OrderStatus {
  ACTIVE = 'active',
  ON_THE_WAY = 'on the way',
  DELIVERED = 'delivered',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}
