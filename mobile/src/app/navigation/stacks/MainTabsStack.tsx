import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CartScreen } from '@/screens/CartScreen';

import { useCartStore } from '@/entities/Cart';
import { AccountIcon, CartIcon, HomeIcon } from '@/shared/libs/icons';

import { Colors } from '@/shared/libs/colors';
import { Header } from '@/shared/ui/header';
import { TextStyles } from '@/shared/libs/textStyles';

import { Screens, Stacks } from '../navigationEnum';
import { CatalogStackNavigator } from './CatalogStack';
import { ProfileStackNavigator } from './AccountStack';

export const MainTabsNavigator = () => {
  const MainTabsStack = createBottomTabNavigator();
  const { quantity } = useCartStore();

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
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {quantity() > 0 && (
                <View style={styles.quantity}>
                  <Text style={TextStyles.c2.changeColor(Colors.Basic100)}>{quantity()}</Text>
                </View>
              )}
              <CartIcon color={focused ? Colors.Basic800 : Colors.Basic600} size={30} />
            </View>
          ),
          header: () => <Header title="Корзина" />,
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

const styles = StyleSheet.create({
  quantity: {
    left: 20,
    bottom: 20,
    position: 'absolute',
    backgroundColor: Colors.Danger500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    width: 25,
    height: 17.5,
    borderRadius: 8,
  },
});
