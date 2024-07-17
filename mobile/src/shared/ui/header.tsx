import React from 'react';
import { Layout, Text, TopNavigation } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { TextStyles } from '../libs/textStyles';

export const Header = ({ title }: { title: string }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <TopNavigation
        alignment="center"
        title={(evaProps) => (
          <Text {...evaProps} style={TextStyles.h6}>
            {t(title)}
          </Text>
        )}
      />
    </Layout>
  );
};
