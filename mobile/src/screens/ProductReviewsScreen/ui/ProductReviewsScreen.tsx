import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CatalogStackParams } from '@/app/navigation/navigationTypes';
import { ProductReviews } from '@/features/ProductReviews';
import { NoItems } from '@/shared/ui/NoItems';

type Props = NativeStackScreenProps<CatalogStackParams, 'ProductReviews'>;

export const ProductReviewsScreen: React.FC<Props> = ({ route }) => {
  const { reviews: idsReview, reviews_count, rating } = route.params;

  if (!idsReview.length) {
    return <NoItems text="Review.У этого товара пока не отзывов" />;
  }

  return <ProductReviews idsReview={idsReview} reviews_count={reviews_count} rating={rating} />;
};
