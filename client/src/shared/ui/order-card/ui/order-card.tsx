import { Button, Card } from 'antd';
import {
  EnumStatus,
  EnumStatusType,
  IOrderCardProps,
  IRenderDeliveryDateProps,
} from '../model/order-card.types';
import { useTranslation } from 'react-i18next';
import { useCurrentLanguage } from 'shared/lib';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { EnumRoutesName } from 'shared/config';

const renderDeliveryDate = (props: IRenderDeliveryDateProps) => {
  const { delivery_date, estimated_delivery_date, lang, tOrder } = props;

  if (delivery_date) {
    return (
      <p>
        {tOrder('Дата доставки:', {
          date: `${new Date(delivery_date).toLocaleTimeString(lang, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`,
        })}
      </p>
    );
  } else if (estimated_delivery_date) {
    return (
      <p>
        {tOrder('Предполагаемая дата доставки:', {
          date: `${new Date(estimated_delivery_date).toLocaleDateString(lang, { day: 'numeric', month: 'long' })}`,
        })}
      </p>
    );
  }
};

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
                {order.status !== EnumStatus.cancelled && (
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
            <Button size="small" disabled>
              {tOrder(EnumStatus[order.status as EnumStatusType])}
            </Button>
          </StyledStatus>
          {renderDeliveryDate({
            delivery_date: order.delivery_date,
            estimated_delivery_date: order.estimated_delivery_date,
            lang,
            tOrder,
            status: order.status,
          })}
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
  & > button {
    cursor: default;
  }
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
