import React, { useEffect } from 'react';

import { ProductList } from '@/widgets/ProductList';
import { useUserFormStore } from '@/features/user-form';
import { useProductStore } from '@/entities/Product';
import { PageSpinner } from '@/shared/ui/PageSpinner';

export const ProductsScreen = () => {
  const { products, getProducts, isLoading } = useProductStore();
  const { getUser } = useUserFormStore();

  useEffect(() => {
    getUser();
    getProducts();
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  return <ProductList products={products} isLoading={isLoading} refreshProducts={getProducts} />;
};
