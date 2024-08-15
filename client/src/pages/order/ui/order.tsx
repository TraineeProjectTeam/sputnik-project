import { Button, Card, message } from 'antd';
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
import { StyledCopyOutlined } from './order.styles';
import { EnumStatus, StatusButton } from 'shared/ui/buttons';
import { useProductsStore } from 'entities/product';
import { getCountProducts } from '../lib/order.lib';
import { useLoginStore } from 'features/auth';

const renderPickupPointInfo = (t: TFunction, currPickupPoint: IMarker) => (
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

const renderUserInfo = (t: TFunction, user: ICustomer) => (
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

const renderPriceInfo = (t: TFunction, price: number) => (
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
  const { role } = useLoginStore();
  const { pickupPoint, isLoading: isLoadingPickupPoint } = useMapStore();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const lang = useCurrentLanguage();

  const onClickButtonCopy = () => {
    if (order?._id) {
      const trimmedText = order._id.trim();

      navigator.clipboard
        .writeText(trimmedText)
        .then(() => {
          message.success(t(`Текст скопирован!`, { text: trimmedText }));
        })
        .catch((errorInfo) => {
          console.log('Validation Failed:', errorInfo);
        });
    }
  };

  const handleAddToCart = () => {
    console.log('Item added to cart');
  };

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [getOrder, id]);

  if (isLoadingOrder || isLoadingPickupPoint || isLoadingProductsForOrder) {
    return <GlobalSpin size={'large'} />;
  }

  if (!order) {
    return <h2>{t('Нет такого заказа')}</h2>;
  }

  if (!pickupPoint || !user || !productsForOrder) {
    return null;
  }

  return (
    <>
      <Link to={EnumRoutesName.ORDERS}>{t('К списку заказов')}</Link>
      <StyledCard>
        <Card.Meta
          title={
            <>
              <h2>
                {t('Заказ №', { number: order._id })}
                <Button onClick={onClickButtonCopy}>
                  <StyledCopyOutlined />
                </Button>
              </h2>
              <p>
                {t(`Заказ от`, {
                  date: convertOrderDate({ date: order.order_date, lang }),
                })}
              </p>
            </>
          }
        />
        <StyledContent>
          <StyledColumn>
            {renderPickupPointInfo(t, pickupPoint)}
            {renderUserInfo(t, user)}
          </StyledColumn>
          <StyledColumn>{renderPriceInfo(t, order.price)}</StyledColumn>
        </StyledContent>
        <StyledOrderBlock>
          <StyledPickupPointBlock>
            <StyledColumnTitle>{t('Доставка в пункт выдачи')}</StyledColumnTitle>
            <div>
              <StatusButton status={EnumStatus[order.status as keyof typeof EnumStatus]} />
            </div>
          </StyledPickupPointBlock>
          {productsForOrder.length ? (
            <StyledCardsOrder>
              <StyledCardsOrderNums>
                {productsForOrder.length} {getCountProducts(productsForOrder.length, t)}
              </StyledCardsOrderNums>
              {Object.values(productsForOrder).map((product) => (
                <StyledCardOrder key={product._id}>
                  <StyledProductName>
                    <StyledImg src={product.thumbnail} alt={'procuct_thumbnail'} />
                    <p>{product.name}</p>
                  </StyledProductName>
                  <StyledPrice>{product.price} ₽</StyledPrice>
                  {role === 'Customer' ? (
                    <Button type="primary" onClick={handleAddToCart}>
                      {t('В корзину')}
                    </Button>
                  ) : null}
                </StyledCardOrder>
              ))}
            </StyledCardsOrder>
          ) : null}
        </StyledOrderBlock>
      </StyledCard>
    </>
  );
};
