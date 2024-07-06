import React from 'react';
import { View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Spinner, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { TextStyles } from '@/shared/libs/textStyles';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { userRoles } from '@/shared/utils/userRoles';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { ErrorText } from '@/shared/ui/errorText';

import { schema } from '../model/validation';
import { RegistrationProps } from '../model/types';
import { useRegistrationStore } from '../model/useRegistrationStore';

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

  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { registration, isLoading } = useRegistrationStore();

  const onPressSend: SubmitHandler<RegistrationProps> = async (formData) => {
    try {
      await registration(formData);
      navigation.dispatch(StackActions.replace('AccountScreen'));
    } catch {
      setError('root', {
        type: 'server',
        message: t('Validation.Проверьте правильность введенных данных'),
      });
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
      <Button onPress={handleSubmit(onPressSend)} disabled={!isValid || isLoading}>
        <View>
          {isLoading ? (
            <Spinner status="control" size="small" />
          ) : (
            <Text style={TextStyles.button}>{t('Form.Зарегистрироваться')}</Text>
          )}
        </View>
      </Button>
      <ErrorText error={errors.root} />
    </View>
  );
};
