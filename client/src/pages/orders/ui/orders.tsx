import { getOrdersRequest, useOrdersStore } from 'entities/order';
import { useEffect } from 'react';

export const OrdersPage = () => {
  const { orders } = useOrdersStore();

  useEffect(() => {
    getOrdersRequest()
  }, []);

  console.log(orders)
  return <></>;
};
