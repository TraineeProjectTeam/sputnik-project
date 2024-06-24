import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainPage } from '@/screens';
import { Screens } from '../navigationEnum';

export const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Screens.ACCOUNT_SCREEN}
    >
      <ProfileStack.Screen name={Screens.ACCOUNT_SCREEN} component={MainPage} />
      <ProfileStack.Screen name={Screens.PROFILE} component={MainPage} />
      <ProfileStack.Screen name={Screens.ORDERS} component={MainPage} />
      <ProfileStack.Screen name={Screens.REVIEWS} component={MainPage} />
    </ProfileStack.Navigator>
  );
};
