import React from 'react';
import { Text, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@ui-kitten/components';

import { useUserStore } from '@/entities/user';

import { TextStyles } from '@/shared/libs/textStyles';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { Select } from '@/shared/ui/select';
import { ErrorText } from '@/shared/ui/errorText';
import { Input } from '@/shared/ui/input';

import { schema } from '../model/validation';
import { AuthByPhoneProps } from '../model/types';
import { AuthByPhone } from '../api';

import Reactotron from 'reactotron-react-native';

export const AuthByPhoneForm = () => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigation = useAppNavigation();

  const { setUser } = useUserStore((state) => ({
    setUser: state.setUser,
  }));

  const Roles = ['Customer', 'Vendor'];

  const onPressSend: SubmitHandler<AuthByPhoneProps> = (formData) => {
    AuthByPhone(formData)
      .then((data) => {
        setUser(data.user, data.access_token, formData.role);
        navigation.navigate('Account', { screen: 'AccountScreen' });
        Reactotron.log(data);
      })
      .catch((error) => {
        setError('root', {
          type: 'server',
          message: 'Проверьте правильность введеных данных!',
        });
        Reactotron.log(error);
      });
  };

  return (
    <View>
      <Text style={TextStyles.h4}>Вход по номеру телефона</Text>
      <Input
        control={control}
        name="phone_number"
        label="Phone Number"
        error={errors.phone_number}
        keyboardType="phone-pad"
      />
      <Input control={control} name="password" label="Password" error={errors.password} />
      <Select control={control} name="role" items={Roles} label="Role" defaultValue={Roles[0]} />
      <Button onPress={handleSubmit(onPressSend)} disabled={!isValid}>
        Submit
      </Button>
      <ErrorText error={errors.root} />
    </View>
  );
};
