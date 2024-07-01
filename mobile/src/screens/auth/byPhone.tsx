import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';

import { AuthByPhoneForm } from '@/features/auth/by-phone';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';

export const AuthByPhonePage = () => {
  const navigation = useAppNavigation();

  const navigateToLoginByEmail = () => {
    navigation.dispatch(StackActions.replace('LoginByEmail'));
  };

  const navigateToRegistration = () => {
    navigation.dispatch(StackActions.replace('Registration'));
  };

  return (
    <AuthLayout>
      <AuthByPhoneForm />
      <Button onPress={navigateToLoginByEmail} appearance="ghost">
        Войти по почте
      </Button>
      <Button onPress={navigateToRegistration} appearance="ghost">
        Зарегистрироваться
      </Button>
    </AuthLayout>
  );
};
