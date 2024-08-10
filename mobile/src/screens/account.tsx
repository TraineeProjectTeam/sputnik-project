import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Menu } from '@ui-kitten/components';

import { Screens, Stacks } from '@/app/navigation/navigationEnum';
import { LogoutButton } from '@/features/auth/logout';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { MenuItem } from '@/shared/ui/menuItem';

export const AccountPage = () => {
  const navigation = useAppNavigation();

  const navigateToProfile = () => {
    navigation.navigate(Stacks.ACCOUNT, { screen: Screens.PROFILE });
  };

  const navigateToLanguages = () => {
    navigation.navigate(Stacks.ACCOUNT, { screen: Screens.LANGUAGE });
  };

  const navigateToReviews = () => {
    navigation.navigate(Stacks.ACCOUNT, { screen: Screens.CUSTOMER_REVIEWS });
  };

  const navigateToFavorites = () => {
    navigation.navigate(Stacks.ACCOUNT, { screen: Screens.FAVORITES });
  };

  const navigateToOrders = () => {
    navigation.navigate(Stacks.ACCOUNT, { screen: Screens.ORDERS });
  };

  return (
    <Layout level="2">
      <Menu style={styles.menu}>
        <MenuItem onPress={navigateToProfile} title="Профиль" />
        <MenuItem onPress={navigateToLanguages} title="Язык" />
        <MenuItem onPress={navigateToReviews} title="Отзывы" />
        <MenuItem onPress={navigateToOrders} title="Заказы" />
        <MenuItem onPress={navigateToFavorites} title="Избранное" />
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
