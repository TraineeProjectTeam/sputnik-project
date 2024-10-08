import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { ProductReviewsScreen } from '@/screens/ProductReviewsScreen';
import { ProductsScreen } from '@/screens/ProductsScreen';
import { ProductDetailedScreen } from '@/screens/ProductDetailedScreen';
import { CategoriesScreen } from '@/screens/CategoriesScreen';

import { HeaderProduct } from '@/widgets/HeaderProduct';
import { useProductStore } from '@/entities/Product';
import { HeaderBack } from '@/shared/ui/headerBack';

import { Screens } from '../navigationEnum';
import { CatalogStackParams } from '../navigationTypes';

export const CatalogStackNavigator = () => {
  const CatalogStack = createNativeStackNavigator<CatalogStackParams>();
  const { t } = useTranslation();
  const { filters } = useProductStore();

  return (
    <CatalogStack.Navigator
      initialRouteName={Screens.CATALOG_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <CatalogStack.Screen name={Screens.CATALOG_SCREEN} component={CategoriesScreen} />
      <CatalogStack.Screen
        name={Screens.PRODUCTS}
        options={{
          headerShown: true,
          header: () => <HeaderBack title={filters.category} />,
        }}
        component={ProductsScreen}
      />
      <CatalogStack.Screen
        name={Screens.PRODUCT}
        options={({ route }) => ({
          headerShown: true,
          header: () => (
            <HeaderProduct title={route.params.product.name} productId={route.params.product._id} />
          ),
        })}
        component={ProductDetailedScreen}
      />
      <CatalogStack.Screen
        name={Screens.PRODUCT_REVIEWS}
        options={{
          headerShown: true,
          header: () => <HeaderBack title={t('Отзывы')} />,
        }}
        component={ProductReviewsScreen}
      />
    </CatalogStack.Navigator>
  );
};
