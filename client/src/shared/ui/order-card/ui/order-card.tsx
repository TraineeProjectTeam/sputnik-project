import { Button, Card } from 'antd';
import { IOrderCardProps } from '../model/order-card.types';
import { useTranslation } from 'react-i18next';
import { useCurrentLanguage } from 'shared/lib';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { EnumRoutesName } from 'shared/config';

export const OrderCard = (props: IOrderCardProps) => {
  const { t: tOrder } = useTranslation('order');
  const { order } = props;
  const lang = useCurrentLanguage();

  return (
    <Link to={`${EnumRoutesName.ORDERS}/${order._id}`}>
      <StyledCard>
        <Card.Meta
          title={
            <StyledTitle>
              <div>
                <div>
                  {tOrder(`Заказ от`, {
                    date: `${new Date(order.order_date).toLocaleDateString(lang, { day: 'numeric', month: 'long' })}`,
                  })}
                </div>
                <StyledLink type="link">{order._id}</StyledLink>
              </div>
              <p>
                {order.status !== 'cancelled' && (
                  <StyledPaidSpan>{tOrder('Оплачено')}</StyledPaidSpan>
                )}{' '}
                <StyledPrice> {`${order.price} ₽`}</StyledPrice>
              </p>
            </StyledTitle>
          }
        />
        <StyledContent>
          <StyledStatus>
            {tOrder('Доставка в пункт выдачи')}
            <Button size="small" style={{ cursor: 'default' }} disabled>
              {tOrder(order.status).charAt(0).toUpperCase() + tOrder(order.status).slice(1)}
            </Button>
          </StyledStatus>
          {order.delivery_date ? (
            <p>
              {tOrder('Дата доставки:', {
                date: `${new Date(order.delivery_date).toLocaleTimeString(lang, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`,
              })}
            </p>
          ) : order.estimated_delivery_date ? (
            <p>
              {tOrder('Предполагаемая дата доставки:', {
                date: `${new Date(order.estimated_delivery_date).toLocaleDateString(lang, { day: 'numeric', month: 'long' })}`,
              })}
            </p>
          ) : (
            ''
          )}
          {/* <p>Pickup Points: {order.pickup_point.join(', ')}</p> */}
          {/* <p>Products: {order.products.join(', ')}</p> */}
        </StyledContent>
      </StyledCard>
    </Link>
  );
};

const StyledCard = styled(Card)`
  box-shadow: var(--shadow);

  @media (max-width: 26.5625rem) {
    .ant-card-body {
      padding: 0.625rem;
    }
  }
`;

const StyledStatus = styled.p`
  display: flex;
  column-gap: 0.625rem;
`;

const StyledPaidSpan = styled.span`
  text-transform: lowercase;
  font-size: 0.875rem;
  font-weight: 400;
`;

const StyledPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;

  @media (max-width: 26.5625rem) {
    font-size: 1rem;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 700;
  flex-wrap: wrap;

  @media (max-width: 26.5625rem) {
    font-size: 1rem;
  }
`;

const StyledLink = styled(Button)`
  font-size: 0.875rem;
  padding: 0;
`;

const StyledContent = styled.div`
  padding-top: 1.25rem;

  @media (max-width: 26.5625rem) {
    padding-top: 1rem;
  }
`;
