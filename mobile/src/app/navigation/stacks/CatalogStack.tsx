import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Screens } from '../navigationEnum';
import { ProductsScreen } from '@/screens/ProductsScreen';

export const CatalogStackNavigator = () => {
  const CatalogStack = createNativeStackNavigator();

  return (
    <CatalogStack.Navigator
      initialRouteName={Screens.CATALOG_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <CatalogStack.Screen name={Screens.CATALOG_SCREEN} component={ProductsScreen} />
    </CatalogStack.Navigator>
  );
};
