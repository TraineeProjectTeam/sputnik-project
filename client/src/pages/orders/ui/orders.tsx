import { useOrdersStore } from 'entities/order';
import { useEffect } from 'react';

export const OrdersPage = () => {
  const { orders, getOrders } = useOrdersStore();

  useEffect(() => {
    getOrders()
  }, [getOrders]);
  console.log(orders)
  return <></>;
};
