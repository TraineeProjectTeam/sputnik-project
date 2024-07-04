import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { useUserStore } from '@/entities/user';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

export const LogoutButton = () => {
  const { reset } = useUserStore();
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const logout = () => {
    navigation.dispatch(StackActions.replace('LoginByEmail'));
    reset();
  };

  return (
    <Button appearance="ghost" status="danger" onPress={logout}>
      {t('Form.Выйти из аккаунта')}
    </Button>
  );
};
