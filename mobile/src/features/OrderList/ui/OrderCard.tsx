import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Divider } from '@ui-kitten/components';

import { Screens } from '@/app/navigation/navigationEnum';
import { Colors } from '@/shared/libs/colors';
import { TextStyles } from '@/shared/libs/textStyles';
import { IOrder, OrderStatus } from '@/shared/libs/types';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

interface OrderCardProps {
  order: IOrder;
}

export const OrderCard: React.FC<OrderCardProps> = memo(({ order }) => {
  const navigate = useAppNavigation();
  const { t } = useTranslation();

  const navigateToOrderDetailed = () => {
    navigate.dispatch(StackActions.push(Screens.ORDER, { order: order }));
  };

  return (
    <Pressable onPress={navigateToOrderDetailed} style={styles.pressable}>
      <View style={styles.header}>
        <Text style={TextStyles.p1}>
          {t('Order.Заказ от', {
            val: new Date(order.order_date),
            formatParams: {
              val: { month: 'long', day: 'numeric' },
            },
          })}
        </Text>
        <Text style={TextStyles.s2.changeColor(Colors.Primary600)}>{order._id}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.body}>
        <View style={styles.status}>
          <Text style={TextStyles.s1}>{t('Order.Статус заказа')} </Text>
          <Text style={TextStyles.s1.changeColor(getTextColor(order.status))}>
            {t(`Order.${order.status}`)}
          </Text>
        </View>
        {order.status === OrderStatus.RECEIVED && (
          <View>
            <Text style={TextStyles.s1}>
              {t('Order.Дата доставки', {
                val: new Date(order.delivery_date),
                formatParams: {
                  val: { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
                },
              })}
            </Text>
          </View>
        )}
        {order.status != OrderStatus.CANCELLED && order.status != OrderStatus.RECEIVED && (
          <View>
            <Text style={TextStyles.s1}>
              {t('Order.Ожидаемая дата доставки', {
                val: new Date(order.delivery_date),
                formatParams: {
                  val: { month: 'long', day: 'numeric' },
                },
              })}
            </Text>
          </View>
        )}
        <View style={styles.products}>
          {order.products.map((item) => (
            <View key={item.product._id}>
              <Image
                source={{ uri: item.product.images[0] }}
                width={60}
                height={75}
                style={styles.image}
              />
              {item.quantity > 1 && (
                <View style={styles.text}>
                  <Text style={TextStyles.c2}>x{item.quantity}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
});

function getTextColor(status: OrderStatus) {
  switch (status) {
    case OrderStatus.ACTIVE:
      return Colors.Primary500;
    case OrderStatus.ON_THE_WAY:
      return Colors.Primary500;
    case OrderStatus.DELIVERED:
      return Colors.Primary500;
    case OrderStatus.RECEIVED:
      return Colors.Success500;
    case OrderStatus.CANCELLED:
      return Colors.Danger500;
    default:
      return Colors.Basic800;
  }
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  header: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
  },
  divider: {
    backgroundColor: Colors.Basic500,
  },
  body: {
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 15,
  },
  status: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  products: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 5,
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
});
