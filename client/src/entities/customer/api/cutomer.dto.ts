import { IOrder } from 'entities/order';
import { IProduct } from 'entities/product';

export interface ICustomer {
  readonly _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  featured: IProduct[];
  cart: IProduct[];
  orders: IOrder[];
  // reviews: IReview[];
}
