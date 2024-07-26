import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AuthByEmailPage,
  AuthByPhonePage,
  MainPage,
  RegistrationPage,
  AccountPage,
  ProfilePage,
  LanguagesPage,
} from '@/screens';

import { CustomerReviewsScreen } from '@/screens/CustomerReviewsScreen';
import { UpdateReviewScreen } from '@/screens/UpdateReviewScreen';
import { CreateReviewScreen } from '@/screens/CreateReviewScreen';

import { storage } from '@/shared/libs/storage';
import { HeaderBack } from '@/shared/ui/headerBack';

import { Screens } from '../navigationEnum';
import { AccountStackParams } from '../navigationTypes';

export const ProfileStackNavigator = () => {
  const ProfileStack = createNativeStackNavigator<AccountStackParams>();

  const isAuth = storage.contains('access_token');

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
      initialRouteName={isAuth ? Screens.ACCOUNT_SCREEN : Screens.LOGIN_BY_PHONE}
    >
      <ProfileStack.Screen name={Screens.ACCOUNT_SCREEN} component={AccountPage} />
      <ProfileStack.Screen
        name={Screens.PROFILE}
        component={ProfilePage}
        options={{ headerShown: true, header: () => <HeaderBack title={'Профиль'} /> }}
      />
      <ProfileStack.Screen
        name={Screens.LANGUAGE}
        component={LanguagesPage}
        options={{ headerShown: true, header: () => <HeaderBack title={'Язык'} /> }}
      />
      <ProfileStack.Screen name={Screens.ORDERS} component={MainPage} />
      <ProfileStack.Screen
        name={Screens.CUSTOMER_REVIEWS}
        component={CustomerReviewsScreen}
        options={{ headerShown: true, header: () => <HeaderBack title={'Review.Мои отзывы'} /> }}
      />
      <ProfileStack.Screen
        name={Screens.CREATE_REVIEW}
        component={CreateReviewScreen}
        options={{ headerShown: true, header: () => <HeaderBack title={'Review.Новый отзыв'} /> }}
      />
      <ProfileStack.Screen
        name={Screens.EDIT_REVIEW}
        component={UpdateReviewScreen}
        options={{
          headerShown: true,
          header: () => <HeaderBack title={'Review.Ваш отзыв о товаре'} />,
        }}
      />
      <ProfileStack.Screen name={Screens.LOGIN_BY_PHONE} component={AuthByPhonePage} />
      <ProfileStack.Screen name={Screens.LOGIN_BY_EMAIL} component={AuthByEmailPage} />
      <ProfileStack.Screen name={Screens.REGISTRATION} component={RegistrationPage} />
    </ProfileStack.Navigator>
  );
};
