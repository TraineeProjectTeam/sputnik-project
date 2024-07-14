import { List } from 'antd';
import { useOrdersStore } from 'entities/order';
import { useEffect } from 'react';
import { GlobalSpin } from 'shared/ui/global-spin';
import { OrderCard } from 'shared/ui/order-card';

export const OrdersPage = () => {
  const { orders, getOrders, isLoading } = useOrdersStore();

  useEffect(() => {
    getOrders()
  }, [getOrders]);
  console.log(orders)

  return (
    <>
      {isLoading ? (
        <GlobalSpin size="large" />
      ) : (
        <List>
          {orders.map((order) => (
            <List.Item key={order.customer_id}  >
              <OrderCard order={order} />
            </List.Item>
          ))}
        </List>
      )}
    </>
  );
};
