import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainTabsNavigator } from './stacks/MainTabsStack';
import { Stacks } from './navigationEnum';
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
    </RootStack.Navigator>
  );
};
