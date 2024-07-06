import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { RegistrationForm } from '@/features/auth/registration';

import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { AuthLayout } from '@/shared/ui/authLayout';
import { ScrollView } from 'react-native';

export const RegistrationPage = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

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
        {t('Form.Войти по номеру телефона')}
      </Button>
      <Button onPress={navigateToLoginByEmail} appearance="ghost">
        {t('Form.Войти по почте')}
      </Button>
    </AuthLayout>
  );
};
