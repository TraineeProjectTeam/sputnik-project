import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CatalogStackParams } from '@/app/navigation/navigationTypes';
import { ProductDetailed } from '@/widgets/ProductDetailed';

type Props = NativeStackScreenProps<CatalogStackParams, 'Product'>;

export const ProductDetailedScreen: React.FC<Props> = ({ route }) => {
  const { product } = route.params;

  return <ProductDetailed product={product} />;
};
