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
import { Select } from '@/shared/ui/select';
import { ErrorText } from '@/shared/ui/errorText';
import { Input } from '@/shared/ui/input';

import { schema } from '../model/validation';
import { AuthByPhoneProps } from '../model/types';
import { AuthByPhone } from '../api/api';

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

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { setUser } = useUserStore();

  const onPressSend: SubmitHandler<AuthByPhoneProps> = async (formData) => {
    try {
      setIsLoading(true);
      const data = await AuthByPhone(formData);
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
      <Text style={TextStyles.h4}>{t('Form.Войти по номеру телефона')}</Text>
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
        {isLoading ? (
          <Spinner status="control" size="small" />
        ) : (
          <Text style={TextStyles.button}>{t('Form.Войти')}</Text>
        )}
      </Button>
      <ErrorText error={errors.root} />
    </View>
  );
};
