import { Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useOrdersStore } from 'entities/order';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { EnumRoutesName } from 'shared/config';
import { useCurrentLanguage } from 'shared/lib';
import { convertOrderDate } from 'shared/lib/helpers';
import MapIcon from '../assets/map.svg';
import MoneyIcon from '../assets/money.svg';
import { GlobalSpin } from 'shared/ui/global-spin';
import {
  StyledCard,
  StyledCardOrder,
  StyledCardsOrder,
  StyledCardsOrderNums,
  StyledColumn,
  StyledColumnContainer,
  StyledColumnTitle,
  StyledContent,
  StyledFullWidth,
  StyledImg,
  StyledOrderBlock,
  StyledPickupPointBlock,
  StyledPrice,
  StyledProductName,
} from './order.styles';
import { IMarker, useMapStore } from 'features/map';
import { TFunction } from 'i18next';
import { ICustomer, useCustomerStore } from 'entities/customer';
import { CopyButton } from 'shared/ui/buttons';
import { EnumStatus, StatusButton } from 'shared/ui/buttons';
import { useProductsStore } from 'entities/product';
import { getCountProducts } from '../lib/order.lib';
import { BasketButton } from 'shared/ui/buttons';

const renderPickupPointInfo = (t: TFunction<'order', undefined>, currPickupPoint: IMarker) => (
  <StyledColumnContainer>
    <div>
      <span>
        <img src={MapIcon} alt="Map Icon" />
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
        <img src={MoneyIcon} alt="Map Icon" />
      </span>
    </div>
    <StyledFullWidth>
      <StyledColumnTitle>{t('Оплачено')}</StyledColumnTitle>
      <StyledPrice>{`${price} ₽`}</StyledPrice>
    </StyledFullWidth>
  </StyledColumnContainer>
);

export const OrderPage = () => {
  const { order, getOrder, isLoadingOrder } = useOrdersStore();
  const { user } = useCustomerStore();
  const { productsForOrder, isLoadingProductsForOrder } = useProductsStore();
  const { pickupPoint, isLoading: isLoadingPickupPoint } = useMapStore();
  const { t: tOrder } = useTranslation('order');
  const { t: tCommon } = useTranslation('common');
  const { t: tProducts } = useTranslation('product');
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const lang = useCurrentLanguage();

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [getOrder, id]);

  if (isLoadingOrder || isLoadingPickupPoint || isLoadingProductsForOrder) {
    return <GlobalSpin size={'large'} />;
  }

  if (!order) {
    return <h2>{tOrder('Нет такого заказа')}</h2>;
  }

  if (!pickupPoint || !user || !productsForOrder) {
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
            {renderPickupPointInfo(tOrder, pickupPoint)}
            {renderUserInfo(tCommon, user)}
          </StyledColumn>
          <StyledColumn>{renderPriceInfo(tOrder, order.price)}</StyledColumn>
        </StyledContent>
        <StyledOrderBlock>
          <StyledPickupPointBlock>
            <StyledColumnTitle>{tOrder('Доставка в пункт выдачи')}</StyledColumnTitle>
            <div>
              <StatusButton status={EnumStatus[order.status as keyof typeof EnumStatus]} />
            </div>
          </StyledPickupPointBlock>
          {productsForOrder.length ? (
            <StyledCardsOrder>
              <StyledCardsOrderNums>
                {productsForOrder.length} {getCountProducts(productsForOrder.length, tProducts)}
              </StyledCardsOrderNums>
              {Object.values(productsForOrder).map((product) => (
                <StyledCardOrder key={product._id}>
                  <StyledProductName>
                    <StyledImg src={product.thumbnail} alt={'procuct_thumbnail'} />
                    <p>{product.name}</p>
                  </StyledProductName>
                  <StyledPrice>{product.price} ₽</StyledPrice>
                  <BasketButton />
                </StyledCardOrder>
              ))}
            </StyledCardsOrder>
          ) : null}
        </StyledOrderBlock>
      </StyledCard>
    </>
  );
};
