import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { Screens } from '@/app/navigation/navigationEnum';
import { RegistrationForm } from '@/features/auth/registration';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';

export const RegistrationPage = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const navigateToLoginByPhone = () => {
    navigation.dispatch(StackActions.replace(Screens.LOGIN_BY_PHONE));
  };

  const navigateToLoginByEmail = () => {
    navigation.dispatch(StackActions.replace(Screens.LOGIN_BY_EMAIL));
  };

  return (
    <AuthLayout>
      <RegistrationForm />
      <Button onPress={navigateToLoginByPhone} appearance="ghost">
        {t('Form.Войти по номеру телефона')}
      </Button>
      <Button onPress={navigateToLoginByEmail} appearance="ghost">
        {t('Form.Войти по почте')}
      </Button>
    </AuthLayout>
  );
};
