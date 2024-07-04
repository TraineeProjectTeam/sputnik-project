import React, { useState } from 'react';
import { View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Spinner, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { useUserStore, userRoles } from '@/entities/user';

import { TextStyles } from '@/shared/libs/textStyles';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { ErrorText } from '@/shared/ui/errorText';

import { schema } from '../model/validation';
import { RegistrationProps } from '../model/types';
import { registration } from '../api/api';

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { setUser } = useUserStore();

  const onPressSend: SubmitHandler<RegistrationProps> = async (formData) => {
    try {
      setIsLoading(true);
      const data = await registration(formData);
      setUser(data.user, data.access_token, formData.role);
      navigation.dispatch(StackActions.replace('AccountScreen'));
    } catch {
      setError('root', {
        type: 'server',
        message: t('Validation.Проверьте правильность введенных данных'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text style={TextStyles.h4}>{t('Form.Зарегистрироваться')}</Text>
      <Input
        control={control}
        name="email"
        label={t('Form.Адрес электронной почты')}
        error={errors.email}
        keyboardType="email-address"
      />
      <Input control={control} name="first_name" label={t('Form.Имя')} error={errors.first_name} />
      <Input
        control={control}
        name="last_name"
        label={t('Form.Фамилия')}
        error={errors.last_name}
      />
      <Input
        control={control}
        name="phone_number"
        label={t('Form.Номер телефона')}
        error={errors.phone_number}
        keyboardType="phone-pad"
      />
      <Input control={control} name="password" label={t('Form.Пароль')} error={errors.password} />
      <Select
        control={control}
        name="role"
        items={userRoles}
        label={t('Form.Войти как')}
        defaultValue={userRoles[0].value}
      />
      <Button onPress={handleSubmit(onPressSend)} disabled={!isValid}>
        {isLoading ? (
          <Spinner status="control" size="small" />
        ) : (
          <Text style={TextStyles.button}>{t('Form.Зарегистрироваться')}</Text>
        )}
      </Button>
      <ErrorText error={errors.root} />
    </View>
  );
};
