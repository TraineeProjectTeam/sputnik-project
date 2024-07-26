import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { useUserStore } from '@/entities/user';
import { useReviewsStore } from '@/entities/Review';

import { PageSpinner } from '@/shared/ui/PageSpinner';
import { NoItems } from '@/shared/ui/NoItems';

import { CustomerReviewCard } from './CustomerReviewCard';

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

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <CustomerReviewCard review={item} key={item._id} />}
    />
  );
};
