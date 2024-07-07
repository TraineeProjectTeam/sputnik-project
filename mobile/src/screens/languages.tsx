import React from 'react';
import { View } from 'react-native';

import { ChangeLanguageButton } from '@/features/change-language';
import { Layout } from '@ui-kitten/components';

export const LanguagesPage = () => {
  return (
    <Layout
      style={{
        padding: 15,
        display: 'flex',
        flex: 1,
      }}
    >
      <ChangeLanguageButton />
    </Layout>
  );
};
