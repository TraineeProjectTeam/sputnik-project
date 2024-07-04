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

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { setUser } = useUserStore();

  const onPressSend: SubmitHandler<AuthByEmailProps> = async (formData) => {
    try {
      setIsLoading(true);
      const data = await AuthByEmail(formData);
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
      <Text style={TextStyles.h4}>{t('Form.Войти по почте')}</Text>
      <Input
        control={control}
        name="email"
        label={t('Form.Адрес электронной почты')}
        error={errors.email}
        keyboardType="email-address"
      />
      <Input control={control} name="password" label={t('Form.Пароль')} error={errors.password} />
      <Select
        control={control}
        name="role"
        label={t('Form.Войти как')}
        items={userRoles}
        defaultValue={userRoles[0].value}
      />
      <Button onPress={handleSubmit(onPressSend)} disabled={!isValid || isLoading}>
        <View>
          {isLoading ? (
            <Spinner status="control" size="small" />
          ) : (
            <Text style={TextStyles.button}>{t('Form.Войти')}</Text>
          )}
        </View>
      </Button>
      <ErrorText error={errors.root} />
    </View>
  );
};
