import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';

import { RegistrationForm } from '@/features/auth/registration';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';

export const RegistrationPage = () => {
  const navigation = useAppNavigation();

  return (
    <AuthLayout>
      <RegistrationForm />
      <Button
        onPress={() => navigation.dispatch(StackActions.replace('LoginByPhone'))}
        appearance="ghost"
      >
        Войти по номеру телефона
      </Button>
      <Button
        onPress={() => navigation.dispatch(StackActions.replace('LoginByEmail'))}
        appearance="ghost"
      >
        Войти по почте
      </Button>
    </AuthLayout>
  );
};
