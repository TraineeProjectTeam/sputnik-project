export interface IOrder {
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
  orders: IOrder[];
  setOrders: (orders: IOrder[]) => void;
  deleteOrder: (id: string) => void;
  addOrder: (order: IOrder) => void;
  updateOrder: (order: IOrder) => void;
}
