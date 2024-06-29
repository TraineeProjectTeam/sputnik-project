import React from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';

import { useUserStore } from '@/entities/user';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';

export const LogoutButton = () => {
  const { reset } = useUserStore((state) => ({
    reset: state.reset,
  }));

  const navigation = useAppNavigation();

  const logout = () => {
    navigation.dispatch(StackActions.replace('LoginByEmail'));
    reset();
  };

  return <Button onPress={logout}>Выйти</Button>;
};
