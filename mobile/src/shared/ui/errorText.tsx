import React from 'react';
import { FieldError } from 'react-hook-form';
import { Text } from 'react-native';

import { TextStyles } from '../libs/textStyles';
import { Colors } from '../libs/colors';

interface ErrorTextProps {
  error:
    | (Record<
        string,
        Partial<{
          type: string | number;
          message: string;
        }>
      > &
        Partial<{
          type: string | number;
          message: string;
        }>)
    | FieldError
    | undefined;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ error }) => {
  return (
    <>
      {error && (
        <Text
          style={{
            ...TextStyles.bodyBold.changeColor(Colors.Danger500),
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          {error.message}
        </Text>
      )}
    </>
  );
};
