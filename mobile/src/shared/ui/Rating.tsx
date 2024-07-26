import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { Star } from '../libs/icons';
import { TextStyles } from '../libs/textStyles';
import { Colors } from '../libs/colors';
import { maxRating } from '../utils/maxRating';

interface RatingButtonProps {
  value: number;
  changeValue: (i: number) => void;
}

export const RatingButton: React.FC<RatingButtonProps> = ({ value, changeValue }) => {
  const { t } = useTranslation();
  const text = [
    t('Review.Ужасный'),
    t('Review.Плохой'),
    t('Review.Нормальный'),
    t('Review.Хороший'),
    t('Review.Отличный'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[...Array(maxRating)].map((_, i) => {
          const handleChangeValue = () => {
            changeValue(i + 1);
          };
          return (
            <TouchableWithoutFeedback key={i} onPress={handleChangeValue}>
              <View>
                <Star size={32} color={value >= i + 1 ? Colors.Warning400 : Colors.Basic200} />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <Text>
        {value && <Text style={TextStyles.p1}>{`${text[value - 1]} ${t('Review.товар')}`} </Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
});
