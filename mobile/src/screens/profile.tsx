import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { UserForm } from '@/features/user-form';

export const ProfilePage = () => {
  return (
    <Layout style={styles.container}>
      <UserForm />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: 'flex',
    flex: 1,
  },
});
