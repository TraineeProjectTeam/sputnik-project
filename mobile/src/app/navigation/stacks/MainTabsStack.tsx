import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainPage } from '@/screens';

import { AccountIcon, CartIcon, HomeIcon } from '@/shared/libs/icons';
import { Colors } from '@/shared/libs/colors';

import { Screens, Stacks } from '../navigationEnum';
import { CatalogStackNavigator } from './CatalogStack';
import { ProfileStackNavigator } from './AccountStack';

export const MainTabsNavigator = () => {
  const MainTabsStack = createBottomTabNavigator();

  return (
    <MainTabsStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTabsStack.Screen
        name={Stacks.CATALOG}
        component={CatalogStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? Colors.Basic800 : Colors.Basic600} size={30} />
          ),
          headerShown: false,
        }}
      />
      <MainTabsStack.Screen
        name={Screens.CART}
        component={MainPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <CartIcon color={focused ? Colors.Basic800 : Colors.Basic600} size={30} />
          ),
        }}
      />
      <MainTabsStack.Screen
        name={Stacks.ACCOUNT}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <AccountIcon color={focused ? Colors.Basic800 : Colors.Basic600} size={30} />
          ),
          headerShown: false,
        }}
      />
    </MainTabsStack.Navigator>
  );
};
