import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';

import { AuthByEmailForm } from '@/features/auth/by-email';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';

export const AuthByEmailPage = () => {
  const navigation = useAppNavigation();

  return (
    <AuthLayout>
      <AuthByEmailForm />
      <Button
        onPress={() => navigation.dispatch(StackActions.replace('LoginByPhone'))}
        appearance="ghost"
      >
        Войти по номеру телефона
      </Button>
      <Button
        onPress={() => navigation.dispatch(StackActions.replace('Registration'))}
        appearance="ghost"
      >
        Зарегистрироваться
      </Button>
    </AuthLayout>
  );
};
