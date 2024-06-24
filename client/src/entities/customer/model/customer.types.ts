import { ICustomer } from '../api/cutomer.dto';

export interface IChangeCustomerRequest {
  user: ICustomer;
}

export interface ICustomerStore {
  user: ICustomer;
  setUser: (user: ICustomer) => void;
}
