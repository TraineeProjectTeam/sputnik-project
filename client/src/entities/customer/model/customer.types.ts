import { ICustomer } from '../api/cutomer.dto';

export interface IChangeCustomerRequest {
  user: Omit<ICustomer, 'id'>;
  id: number;
}
