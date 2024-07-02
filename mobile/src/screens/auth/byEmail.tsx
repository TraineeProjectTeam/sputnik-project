import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';

import { AuthByEmailForm } from '@/features/auth/by-email';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';

export const AuthByEmailPage = () => {
  const navigation = useAppNavigation();

  const navigateToLoginByPhone = () => {
    navigation.dispatch(StackActions.replace('LoginByPhone'));
  };

  const navigateToRegistration = () => {
    navigation.dispatch(StackActions.replace('Registration'));
  };

  return (
    <AuthLayout>
      <AuthByEmailForm />
      <Button onPress={navigateToLoginByPhone} appearance="ghost">
        Войти по номеру телефона
      </Button>
      <Button onPress={navigateToRegistration} appearance="ghost">
        Зарегистрироваться
      </Button>
    </AuthLayout>
  );
};
