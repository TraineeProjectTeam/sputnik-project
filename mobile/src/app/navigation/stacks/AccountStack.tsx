import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AuthByEmailPage,
  AuthByPhonePage,
  MainPage,
  RegistrationPage,
  AccountPage,
} from '@/screens';

import { Screens } from '../navigationEnum';
import { storage } from '@/shared/libs/storage';

export const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator();

  const isAuth = storage.contains('access_token');

  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      initialRouteName={isAuth ? Screens.ACCOUNT_SCREEN : Screens.LOGIN_BY_PHONE}
    >
      <ProfileStack.Screen name={Screens.ACCOUNT_SCREEN} component={AccountPage} />
      <ProfileStack.Screen name={Screens.PROFILE} component={MainPage} />
      <ProfileStack.Screen name={Screens.ORDERS} component={MainPage} />
      <ProfileStack.Screen name={Screens.REVIEWS} component={MainPage} />
      <ProfileStack.Screen name={Screens.LOGIN_BY_PHONE} component={AuthByPhonePage} />
      <ProfileStack.Screen name={Screens.LOGIN_BY_EMAIL} component={AuthByEmailPage} />
      <ProfileStack.Screen name={Screens.REGISTRATION} component={RegistrationPage} />
    </ProfileStack.Navigator>
  );
};
