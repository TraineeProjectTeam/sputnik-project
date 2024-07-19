import { List } from 'antd';
import { useOrdersStore } from 'entities/order';
import { FilterOrders } from 'features/filter-orders';
import { useEffect } from 'react';
import { EnumStatus, OrderCard, TypeEnumStatus } from 'shared/ui/order-card';

export const OrdersPage = () => {
  const { orders, getOrders, isLoading, filtredStatus } = useOrdersStore();

  const filteredOrders =
    filtredStatus !== EnumStatus.all
      ? orders.filter((order) => EnumStatus[order.status as TypeEnumStatus] === filtredStatus)
      : orders;

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <FilterOrders />
      <List loading={isLoading}>
        {filteredOrders.map((order) => (
          <List.Item key={order.customer_id} style={{ display: 'block' }}>
            <OrderCard order={order} />
          </List.Item>
        ))}
      </List>
    </>
  );
};
