import React from 'react';
import { Text, View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@ui-kitten/components';

import { useUserStore } from '@/entities/user';

import { TextStyles } from '@/shared/libs/textStyles';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { ErrorText } from '@/shared/ui/errorText';
import { Role } from '@/shared/libs/types';

import { schema } from '../model/validation';
import { AuthByEmailProps } from '../model/types';
import { AuthByEmail } from '../api/api';

export const AuthByEmailForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigation = useAppNavigation();

  const { setUser } = useUserStore();

  const Roles = [Role.CUSTOMER, Role.VENDOR];

  const onPressSend: SubmitHandler<AuthByEmailProps> = (formData) => {
    AuthByEmail(formData)
      .then((data) => {
        setUser(data.user, data.access_token, formData.role);
        navigation.dispatch(StackActions.replace('AccountScreen'));
      })
      .catch((error) => {
        setError('root', {
          type: 'server',
          message: 'Проверьте правильность введеных данных!',
        });
      });
  };

  return (
    <View>
      <Text style={TextStyles.h4}>Вход по почте</Text>
      <Input
        control={control}
        name="email"
        label="Email"
        error={errors.email}
        keyboardType="email-address"
      />
      <Input control={control} name="password" label="Password" error={errors.password} />
      <Select control={control} name="role" label="Role" items={Roles} defaultValue={Roles[0]} />
      <Button onPress={handleSubmit(onPressSend)} disabled={!isValid}>
        Submit
      </Button>
      <ErrorText error={errors.root} />
    </View>
  );
};
