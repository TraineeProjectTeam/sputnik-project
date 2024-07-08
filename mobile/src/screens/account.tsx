import React, { useEffect } from 'react';
import { Layout, Menu } from '@ui-kitten/components';

import { Screens, Stacks } from '@/app/navigation/navigationEnum';
import { useUserFormStore } from '@/features/user-form/model/useUserFormStore';
import { LogoutButton } from '@/features/auth/logout';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { MenuItem } from '@/shared/ui/menuItem';
import { StyleSheet } from 'react-native';

export const AccountPage = () => {
  const navigation = useAppNavigation();

  const navigateToProfile = () => {
    navigation.navigate(Stacks.ACCOUNT, { screen: Screens.PROFILE });
  };

  const navigateToLanguages = () => {
    navigation.navigate(Stacks.ACCOUNT, { screen: Screens.LANGUAGE });
  };

  const { getUser } = useUserFormStore();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout level="2">
      <Menu style={styles.menu}>
        <MenuItem onPress={navigateToProfile} title="Профиль" />
        <MenuItem onPress={navigateToLanguages} title="Язык" />
        <LogoutButton />
      </Menu>
    </Layout>
  );
};

const styles = StyleSheet.create({
  menu: {
    borderRadius: 10,
  },
});
