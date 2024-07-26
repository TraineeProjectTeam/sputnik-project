import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { PageSpinner } from '@/shared/ui/PageSpinner';

import { ProductCard } from './ProductCard';
import { useProductListStore } from '../model/UseProductListStore';
import { IProduct } from '@/shared/libs/types';

export const ProductList = () => {
  const { products, getProducts, isLoading } = useProductListStore();

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  const keyExtractor = (item: IProduct) => item._id;
  const renderItem = ({ item }: { item: IProduct }) => <ProductCard product={item} />;

  return (
    <FlatList
      data={products}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      contentContainerStyle={{ gap: 7 }}
      columnWrapperStyle={{ gap: 5 }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};
