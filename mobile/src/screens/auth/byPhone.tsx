import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { AuthByPhoneForm } from '@/features/auth/by-phone';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';
import { Screens } from '@/app/navigation/navigationEnum';

export const AuthByPhonePage = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const navigateToLoginByEmail = () => {
    navigation.dispatch(StackActions.replace(Screens.LOGIN_BY_EMAIL));
  };

  const navigateToRegistration = () => {
    navigation.dispatch(StackActions.replace(Screens.REGISTRATION));
  };

  return (
    <AuthLayout>
      <AuthByPhoneForm />
      <Button onPress={navigateToLoginByEmail} appearance="ghost">
        {t('Form.Войти по почте')}
      </Button>
      <Button onPress={navigateToRegistration} appearance="ghost">
        {t('Form.Зарегистрироваться')}
      </Button>
    </AuthLayout>
  );
};
