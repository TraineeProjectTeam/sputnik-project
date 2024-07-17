import React from 'react';
import { StyleSheet } from 'react-native';
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
    <Button
      size={size}
      style={styles.button}
      accessoryLeft={<ShoppingBag size={16} color={Colors.Basic100} />}
    >
      {(evaProps) => (
        <Text {...evaProps} style={TextStyles.button.changeColor(Colors.Basic100)}>
          {t('Product.В корзину')}
        </Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 7,
    marginRight: 7,
    padding: 0,
    marginTop: 'auto',
    marginBottom: 7,
  },
});
