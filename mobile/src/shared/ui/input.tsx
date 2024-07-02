import React from 'react';
import { Controller, FieldError, FieldValues, UseControllerProps } from 'react-hook-form';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Input as KittenInput, Text, InputProps as Props } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../libs/colors';
import { TextStyles } from '../libs/textStyles';

interface InputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<Props, 'defaultValue'> {
  label: string;
  error: FieldError | undefined;
}

export const Input = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  ...props
}: InputProps<T>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={secureTextEntry ? 'visibility-off' : 'visibility'} size={20} color={'black'} />
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <KittenInput
            label={label}
            value={value}
            onChangeText={onChange}
            status={error ? 'danger' : 'basic'}
            accessoryRight={name === 'password' ? renderIcon : undefined}
            secureTextEntry={name === 'password' ? secureTextEntry : false}
            style={styles.input}
            {...props}
          />
        )}
      />
      {error && <Text style={TextStyles.body.changeColor(Colors.Danger500)}>{error.message}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 5,
  },
});
