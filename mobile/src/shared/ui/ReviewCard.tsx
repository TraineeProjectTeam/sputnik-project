import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Layout, Text } from '@ui-kitten/components';

import { TextStyles } from '@/shared/libs/textStyles';
import { IReview } from '@/shared/libs/types';
import { Stars } from '@/shared/ui/Stars';

interface ReviewCardProps {
  review: IReview;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { t } = useTranslation();

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Text style={TextStyles.p1}>{review.customer_fullname}</Text>
        <View style={styles.starContainer}>
          <Stars rating={review.rating} />
        </View>
      </View>
      <Text style={TextStyles.s2}>{t('Review.Комментарий')}</Text>
      <Text style={TextStyles.c1}>{review.body}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 15,
    borderRadius: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
