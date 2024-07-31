import React, { useEffect } from 'react';

import { ProductList } from '@/widgets/ProductList';
import { useFavoriteStore } from '@/entities/Favorite';

export const FavoriteProductsScreen = () => {
  const { favorites, isLoading, getFavorites, pagination, refreshFavorites } = useFavoriteStore();

  const hasMore = pagination.pageCount > pagination.page && pagination.total >= pagination.pageSize;

  useEffect(() => {
    if (!pagination.page) {
      getFavorites();
    }
  }, []);

  const getMoreData = () => {
    if (!isLoading && hasMore) {
      getFavorites();
    }
  };

  return (
    <ProductList
      products={favorites}
      onEndReached={getMoreData}
      isLoading={isLoading}
      refreshProducts={refreshFavorites}
      NoItemsText="Список избранных товаров пуст"
    />
  );
};
