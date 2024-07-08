import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { TextStyles } from '../libs/textStyles';
import { Colors } from '../libs/colors';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ ...TextStyles.h1.changeColor(Colors.Primary500), ...styles.header }}>
        Ozon 2.0
      </Text>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
});
