import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { TextStyles } from '../libs/textStyles';
import { Colors } from '../libs/colors';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <View
      style={{
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Text style={[TextStyles.h1.changeColor(Colors.Primary500), { marginBottom: 20 }]}>
        Ozon 2.0
      </Text>
      {children}
    </View>
  );
};
