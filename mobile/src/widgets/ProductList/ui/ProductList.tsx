import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { PageSpinner } from '@/shared/ui/PageSpinner';

import { ProductCard } from './ProductCard';
import { useProductListStore } from '../model/UseProductListStore';

export const ProductList = () => {
  const { products, getProducts, isLoading } = useProductListStore();

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <FlatList
      data={products}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      contentContainerStyle={{ gap: 7 }}
      columnWrapperStyle={{ gap: 5 }}
      renderItem={({ item }) => {
        return <ProductCard product={item} />;
      }}
    />
  );
};
