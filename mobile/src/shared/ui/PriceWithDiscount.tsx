import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TextStyles } from '../libs/textStyles';
import { Colors } from '../libs/colors';

interface PriceWithDiscountProps {
  price: number;
  discountPrice: number;
  size?: 'small' | 'normal';
}

export const PriceWithDiscount: React.FC<PriceWithDiscountProps> = ({
  price,
  discountPrice,
  size = 'normal',
}) => {
  const calculatePercentage = () => Math.floor((discountPrice / price) * 100);

  if (!discountPrice) {
    return (
      <Text
        style={
          size === 'normal'
            ? TextStyles.h6.changeColor(Colors.Danger500)
            : TextStyles.p1.changeColor(Colors.Danger500)
        }
      >
        {price} ₽
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        style={
          size === 'normal'
            ? TextStyles.h6.changeColor(Colors.Danger500)
            : TextStyles.p1.changeColor(Colors.Danger500)
        }
      >
        {discountPrice} ₽
      </Text>
      <Text
        style={[
          styles.price,
          size === 'normal'
            ? TextStyles.p2.changeColor(Colors.Basic600)
            : TextStyles.c1.changeColor(Colors.Basic600),
        ]}
      >
        {price} ₽
      </Text>
      <Text
        style={
          size === 'normal'
            ? TextStyles.p2.changeColor(Colors.Danger500)
            : TextStyles.c1.changeColor(Colors.Danger500)
        }
      >
        -{calculatePercentage()}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  price: {
    textDecorationLine: 'line-through',
  },
});
