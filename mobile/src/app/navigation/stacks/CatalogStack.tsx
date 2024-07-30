import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProductReviewsScreen } from '@/screens/ProductReviewsScreen';
import { ProductsScreen } from '@/screens/ProductsScreen';
import { ProductDetailedScreen } from '@/screens/ProductDetailedScreen';

import { HeaderProduct } from '@/widgets/HeaderProduct';

import { HeaderBack } from '@/shared/ui/headerBack';

import { Screens } from '../navigationEnum';
import { CatalogStackParams } from '../navigationTypes';

export const CatalogStackNavigator = () => {
  const CatalogStack = createNativeStackNavigator<CatalogStackParams>();

  return (
    <CatalogStack.Navigator
      initialRouteName={Screens.CATALOG_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <CatalogStack.Screen name={Screens.CATALOG_SCREEN} component={ProductsScreen} />
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
          header: () => <HeaderBack title={'Отзывы'} />,
        }}
        component={ProductReviewsScreen}
      />
    </CatalogStack.Navigator>
  );
};
