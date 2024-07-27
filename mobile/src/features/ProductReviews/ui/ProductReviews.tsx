import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Divider, Layout } from '@ui-kitten/components';

import { useReviewsStore } from '@/entities/Review/model/useReviewStore';

import { Colors } from '@/shared/libs/colors';
import { Star } from '@/shared/libs/icons';
import { declination } from '@/shared/utils/declination';
import { TextStyles } from '@/shared/libs/textStyles';
import { PageSpinner } from '@/shared/ui/PageSpinner';
import { ReviewCard } from '@/shared/ui/ReviewCard';
import { IReview } from '@/shared/libs/types';

interface ProductReviewsProps {
  idsReview: string[];
  rating: number;
  reviews_count: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  idsReview,
  rating,
  reviews_count,
}) => {
  const { reviews, getReviews, isLoading } = useReviewsStore();

  useEffect(() => {
    getReviews(idsReview);
  }, []);

  const { t } = useTranslation();
  const titles = [t('Product.отзыв'), t('Product.отзыва'), t('Product.отзывов')];

  if (isLoading) {
    return <PageSpinner />;
  }

  const keyExtractor = (item: IReview) => item._id;
  const renderItem = ({ item }: { item: IReview }) => <ReviewCard review={item} />;

  return (
    <FlatList
      ListHeaderComponent={
        <Layout style={styles.header}>
          <Star size={36} color={Colors.Warning400} />
          <Text style={TextStyles.h4}>{rating} / 5</Text>
          <Divider style={styles.divider} />
          <Text style={TextStyles.h4}>
            {reviews_count} {declination(reviews_count, titles)}
          </Text>
        </Layout>
      }
      data={reviews}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  divider: {
    flex: 1,
  },
});
