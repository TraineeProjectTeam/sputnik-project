import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { useOrderStore } from '@/entities/Order';
import { IOrder } from '@/shared/libs/types';
import { PageSpinner } from '@/shared/ui/PageSpinner';
import { NoItems } from '@/shared/ui/NoItems';
import { OrderCard } from './OrderCard';

export const OrderList = () => {
  const { isLoading, orders, getOrders } = useOrderStore();
  const [refreshing, setIsRefreshing] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getOrders();
  }, []);

  const keyExtractor = (item: IOrder) => item._id;
  const renderItem = ({ item }: { item: IOrder }) => <OrderCard order={item} />;

  const onRefresh = () => {
    try {
      setIsRefreshing(true);
      getOrders();
    } catch {
      Toast.show({
        type: 'error',
        text1: t('Произошла ошибка при загрузке данных...'),
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <FlatList
      data={orders}
      style={styles.container}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={<NoItems text={'Order.Список заказов пуст'} />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
