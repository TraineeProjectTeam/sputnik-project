import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { TextStyles } from '../libs/textStyles';
import { Colors } from '../libs/colors';

interface RemainingProductsProps {
  remaining: number;
  size?: 'small' | 'normal';
}

export const RemainingProducts: React.FC<RemainingProductsProps> = ({
  remaining,
  size = 'normal',
}) => {
  const { t } = useTranslation();

  return (
    <Text style={size === 'normal' ? TextStyles.p1 : TextStyles.c1}>
      {t('Product.Осталось')}
      <Text
        style={
          size === 'normal'
            ? TextStyles.p1.changeColor(Colors.Danger500)
            : TextStyles.c1.changeColor(Colors.Danger500)
        }
      >
        &nbsp;{remaining}&nbsp;
      </Text>
      {t('Product.шт')}
    </Text>
  );
};
