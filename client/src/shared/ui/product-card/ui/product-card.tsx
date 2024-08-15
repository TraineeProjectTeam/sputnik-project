import { Button, Typography } from 'antd';
import { IProductCardProps } from '../model/product-card.types';
import { StarIcon } from 'shared/ui/star-icon';
import { ReviewsIcon } from 'shared/ui/reviews-icon';
import {
  CardStyled,
  CarouselStyled,
  DiscountStyled,
  FooterCardStyled,
  LinkStyled,
  NameStyled,
  PriceBeforeDiscountStyled,
  PriceBlockStyled,
  PriceStyled,
  RatingBlockStyled,
  RatingStyled,
  ReviewsCountBlockStyled,
  ReviewsCountStyled,
  StyledEditButton,
} from './product-card.style';
import { getReviewWordForm } from '../utils/get-review-word-form';
import { getDiscount } from '../utils/get-discount';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { EnumRoutesName } from 'shared/config';

export const ProductCard = (props: IProductCardProps) => {
  const { product } = props;
  const discount = product.discountPrice ? getDiscount(product.discountPrice, product.price) : 0;
  const { pathname } = useLocation();
  const isEditingProduct = pathname === EnumRoutesName.PRODUCTS_VENDOR;
  const { t } = useTranslation();

  return (
    <CardStyled
      hoverable
      cover={
        <CarouselStyled draggable={true}>
          {product.images.map((image) => (
            <img key={image} alt={product.name} src={image} />
          ))}
        </CarouselStyled>
      }
    >
      <PriceBlockStyled>
        <PriceStyled>{product.discountPrice ? product.discountPrice : product.price} ₽</PriceStyled>
        {product.discountPrice && (
          <>
            <PriceBeforeDiscountStyled>{product.price} ₽</PriceBeforeDiscountStyled>
            <DiscountStyled>{discount} %</DiscountStyled>
          </>
        )}
      </PriceBlockStyled>
      <Typography.Text>
        {t('Осталось')} {product.remaining} {t('шт')}
      </Typography.Text>
      <NameStyled level={5}>
        <LinkStyled type="link">{product.name}</LinkStyled>
      </NameStyled>
      <FooterCardStyled>
        {product.rating && (
          <RatingBlockStyled>
            <StarIcon />
            <RatingStyled>{product.rating}</RatingStyled>
          </RatingBlockStyled>
        )}
        {product.reviews_count && (
          <ReviewsCountBlockStyled>
            <ReviewsIcon />
            <ReviewsCountStyled>
              {product.reviews_count} {getReviewWordForm(product.reviews_count, t)}
            </ReviewsCountStyled>
          </ReviewsCountBlockStyled>
        )}
      </FooterCardStyled>

      {isEditingProduct && (
        <StyledEditButton>
          <Button type="primary">{t('Редактировать')}</Button>
        </StyledEditButton>
      )}
    </CardStyled>
  );
};
