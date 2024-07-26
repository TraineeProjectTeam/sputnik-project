import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from '@ui-kitten/components';

import { Colors } from '@/shared/libs/colors';
import { ShoppingBag } from '@/shared/libs/icons';
import { TextStyles } from '@/shared/libs/textStyles';

interface AddToCartBtnProps {
  size?: string;
}

export const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ size = 'medium' }) => {
  const { t } = useTranslation();
  return (
    <Button size={size} accessoryLeft={<ShoppingBag size={16} color={Colors.Basic100} />}>
      {(evaProps) => (
        <Text {...evaProps} style={TextStyles.button.changeColor(Colors.Basic100)}>
          {t('Product.В корзину')}
        </Text>
      )}
    </Button>
  );
};
