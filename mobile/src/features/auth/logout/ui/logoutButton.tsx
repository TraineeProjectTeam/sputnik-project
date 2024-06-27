import { useUserStore } from '@/entities/user';
import { Button } from '@ui-kitten/components';
import React from 'react';

export const LogoutButton = () => {
  const { reset } = useUserStore((state) => ({
    reset: state.reset,
  }));

  return <Button onPress={reset}>Выйти</Button>;
};
