import { Card } from 'antd';
import { HeatMapOutlined, UserOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { useOrdersStore } from 'entities/order';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { EnumRoutesName } from 'shared/config';
import { useCurrentLanguage } from 'shared/lib';
import { convertOrderDate } from 'shared/lib/helpers';
import { GlobalSpin } from 'shared/ui/global-spin';
import {
  StyledCard,
  StyledColumn,
  StyledColumnContainer,
  StyledColumnTitle,
  StyledContent,
  StyledFullWidth,
} from './order.styles';
import { IMarker, useMapStore } from 'features/map';
import { TFunction } from 'i18next';
import { ICustomer, useCustomerStore } from 'entities/customer';
import { CopyButton } from 'shared/ui/copy-button';

const renderPickupPointInfo = (t: TFunction<'order', undefined>, currPickupPoint: IMarker) => (
  <StyledColumnContainer>
    <div>
      <span>
        <HeatMapOutlined />
      </span>
    </div>
    <div>
      <StyledColumnTitle>{t('Доставка в пункт выдачи')}</StyledColumnTitle>
      <p>
        {Object.values(currPickupPoint.address).map(
          (pickupPoint, index, array) => `${pickupPoint}${index === array.length - 1 ? '' : ', '}`,
        )}
      </p>
    </div>
  </StyledColumnContainer>
);

const renderUserInfo = (t: TFunction<'common', undefined>, user: ICustomer) => (
  <StyledColumnContainer>
    <div>
      <span>
        <UserOutlined />
      </span>
    </div>
    <div>
      <StyledColumnTitle>{t('Покупатель')}</StyledColumnTitle>
      {Object.entries(user)
        .filter(([key]) => key !== '_id' && key !== '__v')
        .map(([key, value]) => (
          <p key={key}>{value}</p>
        ))}
    </div>
  </StyledColumnContainer>
);

const renderPriceInfo = (t: TFunction<'price', undefined>, price: number) => (
  <StyledColumnContainer>
    <div>
      <span>
        <DollarCircleOutlined />
      </span>
    </div>
    <StyledFullWidth>
      <StyledColumnTitle>{t('Оплачено')}</StyledColumnTitle>
      <p>{`${price} ₽`}</p>
    </StyledFullWidth>
  </StyledColumnContainer>
);

export const OrderPage = () => {
  const { orders, getOrders, isLoading: isLoadingOrders } = useOrdersStore();
  const { user } = useCustomerStore();
  const { pickupPoints, isLoading: isLoadingMap } = useMapStore();
  const { t: tOrder } = useTranslation('order');
  const { t: tCommon } = useTranslation('common');
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const order = orders.find((order) => order._id === id);
  const lang = useCurrentLanguage();
  const currPickupPoint = pickupPoints.find(
    (pickupPoint) =>
      pickupPoints.some((p) => p.latitude === pickupPoint.latitude) &&
      pickupPoints.some((p) => p.logitude === pickupPoint.logitude),
  );

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (isLoadingOrders || isLoadingMap) {
    return <GlobalSpin size={'large'} />;
  }

  if (!order) {
    return <h2>{tOrder('Нет такого заказа')}</h2>;
  }

  if (!currPickupPoint) {
    return null;
  }

  return (
    <>
      <Link to={EnumRoutesName.ORDERS}>{tOrder('К списку заказов')}</Link>
      <StyledCard>
        <Card.Meta
          title={
            <>
              <h2>
                {tOrder('Заказ №', { number: order._id })} <CopyButton text={order._id} />
              </h2>
              <p>
                {tOrder(`Заказ от`, {
                  date: convertOrderDate({ date: order.order_date, lang }),
                })}
              </p>
            </>
          }
        />
        <StyledContent>
          <StyledColumn>
            {renderPickupPointInfo(tOrder, currPickupPoint)}
            {renderUserInfo(tCommon, user)}
          </StyledColumn>
          <StyledColumn>{renderPriceInfo(tOrder, order.price)}</StyledColumn>
        </StyledContent>
      </StyledCard>
    </>
  );
};
