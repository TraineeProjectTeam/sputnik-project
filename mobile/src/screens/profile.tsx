import React from 'react';
import { View } from 'react-native';

import { UserForm } from '@/features/user-form';
import { Layout } from '@ui-kitten/components';

export const ProfilePage = () => {
  return (
    <Layout
      style={{
        padding: 15,
        display: 'flex',
        flex: 1,
      }}
    >
      <UserForm />
    </Layout>
  );
};
