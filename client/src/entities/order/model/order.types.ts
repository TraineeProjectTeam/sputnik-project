import { EnumStatus } from 'shared/ui/buttons';

export interface IOrder {
  readonly _id: string;
  readonly customer_id: string;
  status: string;
  order_date: Date;
  estimated_delivery_date: Date;
  delivery_date: Date;
  price: number;
  pickup_point: string[];
  products: string[];
}

export interface IUpdateOrderRequestParams {
  order: IOrder;
}

export interface IDeleteOrderRequestParams {
  id: string;
}

export interface IAddOrderRequestParams {
  order: IOrder;
}

export interface IOrdersStore {
  order: null | IOrder;
  orders: IOrder[];
  filtredStatus: EnumStatus;
  isLoading: boolean;
  isLoadingOrder: boolean;
  setOrdredStatus: (status: EnumStatus) => void;
  getOrders: () => void;
  getOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
  addOrder: (order: IOrder) => void;
  updateOrder: (order: IOrder) => void;
}
