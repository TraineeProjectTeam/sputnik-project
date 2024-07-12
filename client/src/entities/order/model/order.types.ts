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
  id: string;
  order: IOrder;
}

export interface IDeleteOrderRequestParams {
  id: string;
}

export interface IGetOrderByIdRequestParams {
  id: string;
}
