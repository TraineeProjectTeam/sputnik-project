import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainPage } from '@/screens';
import { Screens } from '../navigationEnum';

export const CatalogStackNavigator = () => {
  const CatalogStack = createNativeStackNavigator();

  return (
    <CatalogStack.Navigator
      initialRouteName={Screens.CATALOG_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <CatalogStack.Screen name={Screens.CATALOG_SCREEN} component={MainPage} />
    </CatalogStack.Navigator>
  );
};
