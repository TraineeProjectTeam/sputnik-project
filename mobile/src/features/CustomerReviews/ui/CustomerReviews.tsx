import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { useUserStore } from '@/entities/user';
import { useReviewsStore } from '@/entities/Review';

import { PageSpinner } from '@/shared/ui/PageSpinner';
import { NoItems } from '@/shared/ui/NoItems';

import { CustomerReviewCard } from './CustomerReviewCard';
import { IReview } from '@/shared/libs/types';

export const CustomerReviews = () => {
  const { getReviews, reviews, isLoading } = useReviewsStore();
  const { user } = useUserStore();

  useEffect(() => {
    getReviews(user.reviews);
  }, []);

  if (!user.reviews.length) {
    return <NoItems text="Review.Вы пока не оставляли отзывы" />;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  const keyExtractor = (item: IReview) => item._id;
  const renderItem = ({ item }: { item: IReview }) => <CustomerReviewCard review={item} />;

  return <FlatList data={reviews} keyExtractor={keyExtractor} renderItem={renderItem} />;
};
