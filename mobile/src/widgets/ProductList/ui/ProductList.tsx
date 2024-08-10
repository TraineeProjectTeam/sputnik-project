import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import { IProduct } from '@/shared/libs/types';
import { NoItems } from '@/shared/ui/NoItems';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: IProduct[];
  onEndReached?: () => void;
  refreshProducts: () => Promise<IProduct[]>;
  isLoading: boolean;
  NoItemsText?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEndReached,
  isLoading,
  refreshProducts,
  NoItemsText = 'Список продуктов пуст',
}) => {
  const [refreshing, setIsRefreshing] = useState(false);
  const { t } = useTranslation();

  const keyExtractor = (item: IProduct) => item._id;
  const renderItem = ({ item }: { item: IProduct }) => <ProductCard product={item} />;
  const loader = () =>
    isLoading && (
      <View style={styles.loader}>
        <Spinner />
      </View>
    );
  const NoItem = () => !isLoading && <NoItems text={NoItemsText} />;

  const onRefresh = () => {
    try {
      setIsRefreshing(true);
      refreshProducts();
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
      data={products}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      ListEmptyComponent={NoItem}
      contentContainerStyle={styles.content}
      ListFooterComponentStyle={isLoading && styles.footer}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loader}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
