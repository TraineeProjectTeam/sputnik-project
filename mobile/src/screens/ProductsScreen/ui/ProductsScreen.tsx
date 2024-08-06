import React, { useEffect } from 'react';

import { ProductList } from '@/widgets/ProductList';

import { useUserFormStore } from '@/features/user-form';

import { useCartStore } from '@/entities/Cart';
import { useProductStore } from '@/entities/Product';
import { useFavoriteStore } from '@/entities/Favorite';

import { PageSpinner } from '@/shared/ui/PageSpinner';
import { storage } from '@/shared/libs/storage';

export const ProductsScreen = () => {
  const { products, getProducts, isLoading } = useProductStore();
  const { getUser } = useUserFormStore();
  const { setFavoriteIds } = useFavoriteStore();
  const { setProductsIds } = useCartStore();

  const isAuth = storage.contains('access_token');

  useEffect(() => {
    if (isAuth) {
      const getData = async () => {
        const data = await getUser();
        setFavoriteIds(data.featured);
        setProductsIds(data.cart);
      };
      getData();
    }
    getProducts();
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  return <ProductList products={products} isLoading={isLoading} refreshProducts={getProducts} />;
};
