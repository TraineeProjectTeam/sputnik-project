import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { FiltersScreen } from '@/screens/FiltersScreen';
import { HeaderBack } from '@/shared/ui/headerBack';

import { MainTabsNavigator } from './stacks/MainTabsStack';
import { Screens, Stacks } from './navigationEnum';
import { RootStackParamList } from './navigationTypes';

export const RootNavigator = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const { t } = useTranslation();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={Stacks.MAIN}
        options={{ headerShown: false }}
        component={MainTabsNavigator}
      />
      <RootStack.Screen
        name={Screens.FILTERS}
        options={{ header: () => <HeaderBack title={t('Фильтры')} />, presentation: 'modal' }}
        component={FiltersScreen}
      />
    </RootStack.Navigator>
  );
};
