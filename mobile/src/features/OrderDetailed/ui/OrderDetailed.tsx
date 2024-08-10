import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Divider, Layout } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import { useOrderStore } from '@/entities/Order';
import { Colors } from '@/shared/libs/colors';
import { CreditCardIcon, EmojiIcon, LocationIcon, NumbersIcon } from '@/shared/libs/icons';
import { TextStyles } from '@/shared/libs/textStyles';
import { IOrder, OrderStatus } from '@/shared/libs/types';
import { OrderProductCard } from './OrderProductCard';

interface OrderDetailedProps {
  order: IOrder;
}

export const OrderDetailed: React.FC<OrderDetailedProps> = ({ order }) => {
  const { t } = useTranslation();

  const { updateStatusOrder } = useOrderStore();

  const canceleOrder = () => {
    try {
      updateStatusOrder(order._id, OrderStatus.CANCELLED);
      Toast.show({
        type: 'success',
        text1: t('Order.Заказ был отменен'),
      });
    } catch {
      Toast.show({
        type: 'success',
        text1: t('Order.Произошла ошибка при отмене заказа'),
      });
    }
  };

  const quantity = () => order.products.reduce((prev, curr) => prev + curr.quantity, 0);

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <View style={styles.products}>
          {order.products.map((item) => (
            <OrderProductCard key={item.product._id} item={item} status={order.status} />
          ))}
        </View>
        <View style={styles.item}>
          <View style={styles.iconBg}>
            <LocationIcon size={20} color={Colors.Basic600} />
          </View>
          <View style={styles.textContainer}>
            <Text style={TextStyles.bodyBold}>{t('Доставка в пункт выдачи')}</Text>
            <Text style={TextStyles.c2.changeColor(Colors.Basic600)}>
              {order.pickup_point.address.region}, {order.pickup_point.address.city},&nbsp;
              {order.pickup_point.address.street_name}, {order.pickup_point.address.street_number}
            </Text>
            <Divider style={styles.divider} />
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.iconBg}>
            <EmojiIcon size={20} color={Colors.Basic600} />
          </View>
          <View style={styles.textContainer}>
            <Text style={TextStyles.bodyBold}>{t('Order.Получатель')}</Text>
            <Text style={TextStyles.c2.changeColor(Colors.Basic600)}>
              {order.customer_id.last_name} {order.customer_id.first_name}
            </Text>
            <Text style={TextStyles.c2.changeColor(Colors.Basic600)}>
              {order.customer_id.email}
            </Text>
            <Text style={TextStyles.c2.changeColor(Colors.Basic600)}>
              {order.customer_id.phone_number}
            </Text>
            <Divider style={styles.divider} />
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.iconBg}>
            <NumbersIcon size={20} color={Colors.Basic600} />
          </View>
          <View style={styles.textContainer}>
            <Text style={TextStyles.bodyBold}>{t('Order.Номер заказа')}</Text>
            <Text style={TextStyles.c2.changeColor(Colors.Basic600)}>{order._id}</Text>
            <Divider style={styles.divider} />
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.iconBg}>
            <CreditCardIcon size={20} color={Colors.Basic600} />
          </View>
          <View style={styles.textContainer}>
            <Text style={TextStyles.bodyBold}>{t('Order.Общая стоимость')}</Text>
            <View style={styles.item}>
              <Text style={TextStyles.c2}>{t('Order.Товары', { quantity: quantity() })}</Text>
              <Text style={TextStyles.c2}>{order.price} ₽</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.item}>
              <Text style={TextStyles.bodyBold}>{t('Order.Итого')}</Text>
              <Text style={TextStyles.bodyBold}>{order.price} ₽</Text>
            </View>
          </View>
        </View>
      </Layout>
      {order.status != OrderStatus.CANCELLED && order.status != OrderStatus.RECEIVED && (
        <Layout style={styles.footer}>
          <TouchableOpacity style={styles.pressable} onPress={canceleOrder}>
            <Text style={TextStyles.s1.changeColor(Colors.Danger500)}>
              {t('Order.Отменить заказ')}
            </Text>
          </TouchableOpacity>
        </Layout>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  products: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBg: {
    backgroundColor: Colors.Basic400,
    padding: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 2,
    marginRight: 10,
  },
  divider: {
    marginVertical: 10,
  },
  footer: {
    borderRadius: 15,
    marginBottom: 10,
  },
  pressable: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
