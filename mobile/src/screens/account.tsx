import React from 'react';
import { Text, View } from 'react-native';

import { useUserStore } from '@/entities/user';

import { LogoutButton } from '@/features/auth/logout';
import { ChangeLanguageButton } from '@/features/change-language';
import { TextStyles } from '@/shared/libs/textStyles';

export const AccountPage = () => {
  const { user } = useUserStore();
  return (
    <View
      style={{
        padding: 15,
        display: 'flex',
        flex: 1,
      }}
    >
      <Text style={TextStyles.body}>{user.email}</Text>
      <Text style={TextStyles.body}>{user.first_name}</Text>
      <Text style={TextStyles.body}>{user.last_name}</Text>
      <Text style={TextStyles.body}>{user.phone_number}</Text>
      <ChangeLanguageButton />
      <LogoutButton />
    </View>
  );
};
