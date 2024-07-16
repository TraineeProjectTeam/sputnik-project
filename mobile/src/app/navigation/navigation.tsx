import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainPage } from '@/screens';
import { ProductDetailedScreen } from '@/screens/ProductDetailedScreen';

import { HeaderProduct } from '@/widgets/HeaderProduct';

import { MainTabsNavigator } from './stacks/MainTabsStack';
import { Screens, Stacks } from './navigationEnum';
import { RootStackParamList } from './navigationTypes';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Stacks.MAIN}
        options={{ headerShown: false }}
        component={MainTabsNavigator}
      />
      <RootStack.Screen
        name={Screens.LOADING}
        options={{ headerShown: false }}
        component={MainPage}
      />
      <RootStack.Screen
        name={Screens.PRODUCT}
        options={({ route }) => ({
          header: () => <HeaderProduct title={route.params.product.name} />,
        })}
        component={ProductDetailedScreen}
      />
    </RootStack.Navigator>
  );
};
