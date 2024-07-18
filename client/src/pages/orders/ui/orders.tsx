import { List } from 'antd';
import { useOrdersStore } from 'entities/order';
import { FilterOrders } from 'features/filter-orders';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EnumStatus, OrderCard } from 'shared/ui/order-card';

export const OrdersPage = () => {
  const { orders, getOrders, isLoading, filtredStatus } = useOrdersStore();
  const { t: tOrder } = useTranslation('order');

  const filteredOrders =
    filtredStatus !== EnumStatus.all
      ? orders.filter((order) => order.status === tOrder(filtredStatus).toLowerCase())
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
