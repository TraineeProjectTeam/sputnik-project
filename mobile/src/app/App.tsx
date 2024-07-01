import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ApplicationProvider } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';

import { RootNavigator } from './navigation/navigation';

export function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        <RootNavigator />
      </ApplicationProvider>
    </NavigationContainer>
  );
}
