import React from 'react';

import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { Navigation } from './navigation';

export function App(): React.JSX.Element {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Navigation />
    </ApplicationProvider>
  );
}
