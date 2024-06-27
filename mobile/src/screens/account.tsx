import React from 'react';
import { Text, View } from 'react-native';

import { useUserStore } from '@/entities/user';
import { LogoutButton } from '@/features/auth/logout';
import { TextStyles } from '@/shared/libs/textStyles';

export const AccountPage = () => {
  const { user, role, access_token } = useUserStore((state) => ({
    user: state.user,
    role: state.role,
    access_token: state.access_token,
  }));
  console.log(access_token, role);
  return (
    <View>
      <Text style={TextStyles.body}>{user.email}</Text>
      <Text style={TextStyles.body}>{user.first_name}</Text>
      <Text style={TextStyles.body}>{user.last_name}</Text>
      <Text style={TextStyles.body}>{user.phone_number}</Text>
      <Text style={TextStyles.body}>{role}</Text>
      <LogoutButton />
    </View>
  );
};
