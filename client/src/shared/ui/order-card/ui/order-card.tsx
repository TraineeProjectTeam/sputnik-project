import { Button, Card } from "antd";
import { IOrderCardProps } from "../model/order-card.types";
import { useTranslation } from "react-i18next";
import { useCurrentLanguage } from "shared/lib";
import styled from "styled-components";

export const OrderCard = (props: IOrderCardProps) => {
  const { t: tOrder } = useTranslation('order')
  const { order } = props;
  const lang = useCurrentLanguage()

  return (
    <Card title={tOrder(`Заказ от`, { date: `${new Date(order.order_date).toLocaleDateString(lang, { day: 'numeric', month: 'long' })}` })}>
      <p>{order._id}</p>
      <StyledP>
        {tOrder('Доставка в пункт выдачи')}
        <Button
          size='small'
          style={{ cursor: 'default' }}
          disabled
        >
          {tOrder(order.status).charAt(0).toUpperCase() + tOrder(order.status).slice(1)}
        </Button>
      </StyledP>
      <p>Estimated Delivery Date: {order.estimated_delivery_date.toDateString()}</p>
      <p>{tOrder('Дата доставки', {
        date: `${new Date(order.order_date).toLocaleTimeString(lang, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`
      })}</p>
      <p>Price: {order.price} ₽</p>
      {/* <p>Pickup Points: {order.pickup_point.join(', ')}</p> */}
      {/* <p>Products: {order.products.join(', ')}</p> */}
    </Card>
  );
};

const StyledP = styled.p`
  display: flex;
  column-gap: 0.625rem;
`