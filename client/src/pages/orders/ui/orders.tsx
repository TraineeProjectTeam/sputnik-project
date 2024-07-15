import { List, Empty } from 'antd';
import { useOrdersStore } from 'entities/order';
import { useEffect } from 'react';
import { OrderCard } from 'shared/ui/order-card';

export const OrdersPage = () => {
  const { orders, getOrders, isLoading } = useOrdersStore();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (!orders.length && !isLoading) {
    return <Empty />;
  }

  return (
    <List loading={isLoading}>
      {orders.map((order) => (
        <List.Item key={order.customer_id} style={{ display: 'block' }}>
          <OrderCard order={order} />
        </List.Item>
      ))}
    </List>
  );
};
