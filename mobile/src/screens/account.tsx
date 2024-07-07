import React, { useEffect } from 'react';

import { LogoutButton } from '@/features/auth/logout';

import { Layout, Menu, Text } from '@ui-kitten/components';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { useTranslation } from 'react-i18next';
import { useUserFormStore } from '@/features/user-form/model/useUserFormStore';
import { ArrowRight } from '@/shared/libs/icons';
import { Colors } from '@/shared/libs/colors';
import { TextStyles } from '@/shared/libs/textStyles';
import { MenuItem } from '@/shared/ui/menuItem';

export const AccountPage = () => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const navigateToProfile = () => {
    navigation.navigate('Account', { screen: 'Profile' });
  };

  const navigateToLanguages = () => {
    navigation.navigate('Account', { screen: 'Language' });
  };

  const { getUser } = useUserFormStore();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout level="2">
      <Menu style={{ borderRadius: 10 }}>
        <MenuItem onPress={navigateToProfile} title="Профиль" />
        <MenuItem onPress={navigateToLanguages} title="Язык" />
        <LogoutButton />
      </Menu>
    </Layout>
  );
};
