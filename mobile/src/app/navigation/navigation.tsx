import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainPage } from '@/screens';
import { MainTabsNavigator } from './stacks/MainTabsStack';
import { Screens, Stacks } from './navigationEnum';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator();

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
        name={Screens.LOGIN}
        options={{ headerShown: false }}
        component={MainPage}
      />
      <RootStack.Screen
        name={Screens.PRODUCT}
        options={{ headerShown: false }}
        component={MainPage}
      />
    </RootStack.Navigator>
  );
};
