import { Typography } from 'antd';
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
} from './product-card.style';
import { getReviewWordForm } from '../utils/getReviewWordForm';
import { getDiscount } from '../utils/getDiscount';
import { useTranslation } from 'react-i18next';

export const ProductCard = (props: IProductCardProps) => {
  const { product } = props;
  const discount = product.discountPrice ? getDiscount(product.discountPrice, product.price) : 0;
  const { t } = useTranslation('product');

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
        <PriceStyled>{product.price} ₽</PriceStyled>
        {product.discountPrice && (
          <>
            <PriceBeforeDiscountStyled>{product.discountPrice} ₽</PriceBeforeDiscountStyled>
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
    </CardStyled>
  );
};
