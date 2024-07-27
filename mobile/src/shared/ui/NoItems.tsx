import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Layout } from '@ui-kitten/components';

import { TextStyles } from '../libs/textStyles';

interface NoItemsProps {
  text: string;
}

export const NoItems: React.FC<NoItemsProps> = ({ text }) => {
  const { t } = useTranslation();
  return (
    <Layout style={styles.layout}>
      <Text style={TextStyles.p1}>{t(`${text}`)}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
