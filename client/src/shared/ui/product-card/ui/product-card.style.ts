import { Button, Card, Carousel, Typography } from 'antd';
import styled from 'styled-components';

export const CardStyled = styled(Card)`
  width: 100%;
  max-width: 18.75rem;
  cursor: initial;
  height: 100%;
  .ant-card-cover .slick-slide {
    max-height: 18.75rem;
    overflow: hidden;
  }
`;

export const CarouselStyled = styled(Carousel)`
  cursor: grab;
  .slick-dots.slick-dots-bottom {
    gap: 0;
    li,
    li.active {
      width: 0.5rem;
      height: 0.5rem;
      button {
        border-radius: 5px;
        height: 100%;
        background: var(--main-background-color);
      }
    }
  }
`;

export const PriceBlockStyled = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 0.3rem;
`;

export const PriceStyled = styled(Typography.Text)`
  color: var(--product-card-price-color);
  font-weight: 700;
  font-size: 1.25rem;
`;

export const PriceBeforeDiscountStyled = styled(Typography.Text)`
  color: var(--poruct-card-price-before-discount-color);
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  &::before {
    background: var(--poruct-card-price-before-discount-color);
    content: "";
    display: block;
    height: 1px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: rotate(-3deg);
    width: 100%;
  }
}
`;

export const DiscountStyled = styled(Typography.Text)`
  color: var(--product-card-price-color);
  font-weight: 600;
  font-size: 1rem;
`;

export const NameStyled = styled(Typography.Title)`
  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const RatingBlockStyled = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const RatingStyled = styled(Typography.Text)`
  color: var(--product-card-footer-text-color);
  font-weight: 500;
  font-size: 1rem;
`;

export const ReviewsCountBlockStyled = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ReviewsCountStyled = styled(Typography.Text)`
  color: var(--product-card-footer-text-color);
  font-weight: 500;
  font-size: 1rem;
`;

export const FooterCardStyled = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const LinkStyled = styled(Button)`
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  text-wrap: initial;
  text-align: left;
  height: initial;
`;

export const StyledEditButton = styled.div`
  padding-top: 0.75rem;
  & > button {
    width: 100%;
  }
`;
