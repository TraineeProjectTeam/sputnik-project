import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ArrowRight, Star } from '../libs/icons';
import { TextStyles } from '../libs/textStyles';
import { Colors } from '../libs/colors';
import { declination } from '../utils/declination';

interface ReviewsButtonProps {
  rating: number;
  reviews_count: number;
}

export const ReviewButton: React.FC<ReviewsButtonProps> = ({ rating, reviews_count }) => {
  const { t } = useTranslation();
  const titles = [t('Product.Отзыв'), t('Product.Отзыва'), t('Product.Отзывов')];

  return (
    <Pressable style={styles.pressable}>
      <View style={styles.container}>
        <View style={styles.rating}>
          <Star size={18} color={reviews_count ? Colors.Warning500 : Colors.Basic700} />
          <Text style={TextStyles.p1}>{rating}</Text>
        </View>
        <Text style={TextStyles.p1.changeColor(Colors.Basic600)}>
          {reviews_count ? reviews_count : t('Product.Нет')} {declination(reviews_count, titles)}
        </Text>
      </View>
      <View style={styles.arrow}>
        <ArrowRight size={24} color={Colors.Basic600} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: Colors.Basic100,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  rating: { display: 'flex', flexDirection: 'row' },
  arrow: { marginLeft: 'auto' },
});
