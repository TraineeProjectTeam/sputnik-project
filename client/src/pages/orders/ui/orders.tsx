import { List } from 'antd';
import { useOrdersStore } from 'entities/order';
import { FilterOrders } from 'features/filter-orders';
import { useEffect } from 'react';
import { EnumStatus } from 'shared/ui/buttons';
import { StyledListItem } from './orders.styles';
import { OrderCard } from './order-card';

export const OrdersPage = () => {
  const { orders, getOrders, isLoading, filtredStatus } = useOrdersStore();

  const filteredOrders =
    filtredStatus !== EnumStatus.all
      ? orders.filter(
          (order) => EnumStatus[order.status as keyof typeof EnumStatus] === filtredStatus,
        )
      : orders;

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <FilterOrders />
      <List loading={isLoading}>
        {filteredOrders.map((order) => (
          <StyledListItem key={order.customer_id}>
            <OrderCard order={order} />
          </StyledListItem>
        ))}
      </List>
    </>
  );
};
