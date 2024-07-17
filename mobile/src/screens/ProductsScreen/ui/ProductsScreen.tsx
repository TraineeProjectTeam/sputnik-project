import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ProductList } from '@/widgets/ProductList';

export const ProductsScreen = () => {
  return (
    <Layout level="2" style={styles.container}>
      <ProductList />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: 'flex',
    flex: 1,
  },
});
