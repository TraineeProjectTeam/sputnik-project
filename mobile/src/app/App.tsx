import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApplicationProvider } from '@ui-kitten/components';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as eva from '@eva-design/eva';
import Toast from 'react-native-toast-message';

import { RootNavigator } from './navigation/navigation';

import '@/shared/config/i18n/i18n';
import { toastConfig } from '@/shared/config/Toast';

export function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <BottomSheetModalProvider>
            <RootNavigator />
          </BottomSheetModalProvider>
        </ApplicationProvider>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
