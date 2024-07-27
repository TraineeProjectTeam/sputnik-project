import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { TextStyles } from '../libs/textStyles';
import { ChatBubble, Star } from '../libs/icons';
import { Colors } from '../libs/colors';
import { declination } from '../utils/declination';

interface RatingWithReviewsProps {
  rating: number;
  reviews_count: number;
}

export const RatingAndReviews: React.FC<RatingWithReviewsProps> = ({ rating, reviews_count }) => {
  const { t } = useTranslation();
  const titles = [t('Product.отзыв'), t('Product.отзыва'), t('Product.отзывов')];

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Star size={16} color={Colors.Warning500} />
        <Text style={TextStyles.c1}>{rating}</Text>
      </View>
      <View style={styles.itemContainer}>
        <ChatBubble size={13} color={Colors.Basic600} />
        <Text style={TextStyles.c1.changeColor(Colors.Basic600)}>
          {reviews_count} {declination(reviews_count, titles)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});
