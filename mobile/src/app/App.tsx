import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Toast from 'react-native-toast-message';

import { RootNavigator } from './navigation/navigation';

import '@/shared/config/i18n/i18n';
import { toastConfig } from '@/shared/config/Toast';

export function App(): React.JSX.Element {
  return (
    <>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <RootNavigator />
        </ApplicationProvider>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
