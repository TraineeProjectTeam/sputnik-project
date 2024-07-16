import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

export const PageSpinner = () => {
  return (
    <Layout style={styles.layout}>
      <Spinner size="large" />
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
