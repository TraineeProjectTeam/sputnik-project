import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Layout, Spinner } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import { useCartStore } from '@/entities/Cart';

import { TextStyles } from '@/shared/libs/textStyles';
import { Colors } from '@/shared/libs/colors';
import { storage } from '@/shared/libs/storage';
import { IOrderProduct } from '@/shared/libs/types';
import { NoItems } from '@/shared/ui/NoItems';

import { CartProduct } from './CartProduct';

export const CartProductList = () => {
  const {
    cartProducts,
    getCartProducts,
    pagination,
    isLoading,
    quantity,
    price,
    discount,
    refreshCart,
  } = useCartStore();

  const { t } = useTranslation();

  const hasMore = pagination.pageCount > pagination.page && pagination.total >= pagination.pageSize;

  const isAuth = storage.contains('access_token');

  useEffect(() => {
    if (!pagination.page && isAuth) {
      getCartProducts();
    }
  }, [isAuth]);

  const getMoreData = () => {
    if (!isLoading && hasMore) {
      getCartProducts();
    }
  };

  const keyExtractor = (item: IOrderProduct) => item.product._id;
  const renderItem = ({ item }: { item: IOrderProduct }) => <CartProduct product={item.product} />;

  const header = () =>
    cartProducts.length > 0 && (
      <>
        <Layout style={styles.header}>
          <Text style={{ ...TextStyles.h5, ...styles.textHeader }}>{t('Cart.Доставка')}</Text>
        </Layout>
        <Divider />
      </>
    );
  const Loader = () =>
    isLoading && (
      <View style={styles.loader}>
        <Spinner />
      </View>
    );
  const NoItem = () => !isLoading && <NoItems text="Cart.Корзина пуста" />;

  const [refreshing, setIsRefreshing] = useState(false);
  const onRefresh = () => {
    try {
      setIsRefreshing(true);
      if (isAuth) {
        refreshCart();
      }
    } catch {
      Toast.show({
        type: 'error',
        text1: t('Произошла ошибка при загрузке данных...'),
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <FlatList
      data={cartProducts}
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
      onEndReached={getMoreData}
      ListEmptyComponent={NoItem}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListHeaderComponent={header}
      contentContainerStyle={styles.content}
      ListHeaderComponentStyle={{
        ...styles.listHeader,
        marginTop: cartProducts.length > 0 ? 10 : 0,
      }}
      ListFooterComponentStyle={isLoading && styles.footer}
      ListFooterComponent={
        <>
          <Loader />
          {cartProducts.length > 0 && (
            <Layout style={styles.footerContainer}>
              <Text style={{ ...TextStyles.h5, ...styles.textHeader }}>
                {t('Cart.Ваша корзина')}
              </Text>
              <View style={styles.footerItem}>
                <Text style={TextStyles.s1}>
                  {t('Cart.Товары')} ({quantity()})
                </Text>
                <Text style={TextStyles.s1}>{price()} ₽</Text>
              </View>
              <View style={styles.footerItem}>
                <Text style={TextStyles.s1}>{t('Cart.Скидка')} </Text>
                <Text style={TextStyles.s1.changeColor(Colors.Danger500)}>
                  - {price() - discount()} ₽
                </Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.footerItem}>
                <Text style={TextStyles.h5}>{t('Cart.Итого')}</Text>
                <Text style={TextStyles.h5.changeColor(Colors.Success500)}>{discount()} ₽</Text>
              </View>
              <Button style={styles.button}>{t('Cart.Оформить заказ')}</Button>
            </Layout>
          )}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textHeader: {
    marginBottom: 5,
  },
  listHeader: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
  },
  footerContainer: {
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
  },
});
