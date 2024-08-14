import { Card } from 'antd';
import { IOrderCardProps, IRenderDeliveryDateProps } from '../model/order-card.types';
import { useTranslation } from 'react-i18next';
import { useCurrentLanguage } from 'shared/lib';
import { Link } from 'react-router-dom';
import { EnumRoutesName } from 'shared/config';
import { convertDeliveryDate } from 'shared/lib/helpers';
import { convertEstimatedDeliveryDate, convertOrderDate } from 'shared/lib/helpers/date';
import {
  StyledContent,
  StyledLink,
  StyledOrderInfo,
  StyledPaidSpan,
  StyledPrice,
  StyledStatus,
  StyledTitle,
} from './order-card.styles';
import { EnumStatus, StatusButton } from 'shared/ui/buttons';

const renderDeliveryDate = (props: IRenderDeliveryDateProps) => {
  const { delivery_date, estimated_delivery_date, lang, t } = props;

  if (delivery_date) {
    return (
      <p>
        {t('Дата доставки:', {
          date: convertDeliveryDate({ date: delivery_date, lang }),
        })}
      </p>
    );
  } else if (estimated_delivery_date) {
    return (
      <p>
        {t('Предполагаемая дата доставки:', {
          date: convertEstimatedDeliveryDate({ date: estimated_delivery_date, lang }),
        })}
      </p>
    );
  }
};

export const OrderCard = (props: IOrderCardProps) => {
  const { t } = useTranslation();
  const { order } = props;
  const lang = useCurrentLanguage();

  return (
    <Link to={`${EnumRoutesName.ORDERS}/${order._id}`}>
      <StyledOrderInfo>
        <Card.Meta
          title={
            <StyledTitle>
              <div>
                <div>
                  {t(`Заказ от`, {
                    date: convertOrderDate({ date: order.order_date, lang }),
                  })}
                </div>
                <StyledLink type="link">{order._id}</StyledLink>
              </div>
              <p>
                {order.status !== EnumStatus.cancelled && (
                  <StyledPaidSpan>{t('Оплачено')}</StyledPaidSpan>
                )}{' '}
                <StyledPrice> {`${order.price} ₽`}</StyledPrice>
              </p>
            </StyledTitle>
          }
        />
        <StyledContent>
          <StyledStatus>
            {t('Доставка в пункт выдачи')}
            <StatusButton status={EnumStatus[order.status as keyof typeof EnumStatus]} />
          </StyledStatus>
          {renderDeliveryDate({
            delivery_date: order.delivery_date,
            estimated_delivery_date: order.estimated_delivery_date,
            lang,
            t,
            status: order.status,
          })}
        </StyledContent>
      </StyledOrderInfo>
    </Link>
  );
};
