import React from 'react';
import { StackActions } from '@react-navigation/native';
import { MenuItem, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { Screens } from '@/app/navigation/navigationEnum';
import { useUserStore } from '@/entities/user';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { TextStyles } from '@/shared/libs/textStyles';
import { Colors } from '@/shared/libs/colors';

export const LogoutButton = () => {
  const { reset } = useUserStore();
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const logout = () => {
    navigation.dispatch(StackActions.replace(Screens.LOGIN_BY_PHONE));
    reset();
  };

  return (
    <MenuItem
      onPress={logout}
      style={{ paddingRight: 15, paddingLeft: 15, paddingVertical: 18 }}
      title={(props) => (
        <Text {...props} style={TextStyles.bodyBold.changeColor(Colors.Danger500)}>
          {t('Form.Выйти из аккаунта')}
        </Text>
      )}
    />
  );
};
