import React, { useEffect } from 'react';

import { ProductList } from '@/widgets/ProductList';
import { useUserFormStore } from '@/features/user-form';
import { useProductStore } from '@/entities/Product';
import { PageSpinner } from '@/shared/ui/PageSpinner';
import { useFavoriteStore } from '@/entities/Favorite';

export const ProductsScreen = () => {
  const { products, getProducts, isLoading } = useProductStore();
  const { getUser } = useUserFormStore();
  const { setFavoriteIds } = useFavoriteStore();

  useEffect(() => {
    const getData = async () => {
      const data = await getUser();
      setFavoriteIds(data.featured);
    };
    getData();
    getProducts();
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  return <ProductList products={products} isLoading={isLoading} refreshProducts={getProducts} />;
};
