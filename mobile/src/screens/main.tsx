import { TextStyles } from '@/shared/libs/textStyles';
import { Button } from '@ui-kitten/components';
import React from 'react';
import { Text, View } from 'react-native';

export const MainPage = () => {
  return (
    <View>
      <Text style={TextStyles.h1}>test</Text>
      <Button>Text</Button>
    </View>
  );
};
