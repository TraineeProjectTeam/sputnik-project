import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';

import { RegistrationForm } from '@/features/auth/registration';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';

export const RegistrationPage = () => {
  const navigation = useAppNavigation();

  const navigateToLoginByPhone = () => {
    navigation.dispatch(StackActions.replace('LoginByPhone'));
  };

  const navigateToLoginByEmail = () => {
    navigation.dispatch(StackActions.replace('LoginByEmail'));
  };

  return (
    <AuthLayout>
      <RegistrationForm />
      <Button onPress={navigateToLoginByPhone} appearance="ghost">
        Войти по номеру телефона
      </Button>
      <Button onPress={navigateToLoginByEmail} appearance="ghost">
        Войти по почте
      </Button>
    </AuthLayout>
  );
};
