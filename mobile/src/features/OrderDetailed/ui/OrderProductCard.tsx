import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Screens } from '@/app/navigation/navigationEnum';
import { Colors } from '@/shared/libs/colors';
import { TextStyles } from '@/shared/libs/textStyles';
import { IOrderProduct, OrderStatus } from '@/shared/libs/types';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

interface OrderProductCardProps {
  item: IOrderProduct;
  status: OrderStatus;
}

export const OrderProductCard: React.FC<OrderProductCardProps> = ({ item, status }) => {
  const navigate = useAppNavigation();
  const { t } = useTranslation();

  const navigateToCreateReview = () => {
    navigate.dispatch(StackActions.push(Screens.CREATE_REVIEW, { product: item.product }));
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: item.product.images[0] }}
          width={120}
          height={140}
          style={styles.image}
        />
        {item.quantity > 1 && (
          <View style={styles.text}>
            <Text style={TextStyles.c2}>x{item.quantity}</Text>
          </View>
        )}
      </View>
      {status === OrderStatus.RECEIVED && (
        <TouchableOpacity onPress={navigateToCreateReview} style={styles.touchable}>
          <Text style={TextStyles.c2.changeColor(Colors.Primary500)}>
            {t('Order.Оценить товар')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 10,
  },
  text: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    bottom: 0,
    right: 0,
    padding: 2,
  },
  touchable: {
    paddingVertical: 5,
  },
});
