import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';

import { AuthByPhoneForm } from '@/features/auth/by-phone';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';

export const AuthByPhonePage = () => {
  const navigation = useAppNavigation();

  return (
    <AuthLayout>
      <AuthByPhoneForm />
      <Button
        onPress={() => navigation.dispatch(StackActions.replace('LoginByEmail'))}
        appearance="ghost"
      >
        Войти по почте
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
