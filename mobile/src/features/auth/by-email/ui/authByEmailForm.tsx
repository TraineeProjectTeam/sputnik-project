import React from 'react';
import { View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Spinner, Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { Screens } from '@/app/navigation/navigationEnum';
import { TextStyles } from '@/shared/libs/textStyles';
import { useAppNavigation } from '@/shared/libs/useAppNavigation';
import { userRoles } from '@/shared/utils/userRoles';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { ErrorText } from '@/shared/ui/errorText';

import { schema } from '../model/validation';
import { AuthByEmailProps } from '../model/types';
import { useAuthByEmailStore } from '../model/useAuthByEmailStore';

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

  const { isLoading, authByEmail } = useAuthByEmailStore();
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const onPressSend: SubmitHandler<AuthByEmailProps> = async (formData) => {
    try {
      await authByEmail(formData);
      navigation.dispatch(StackActions.replace(Screens.ACCOUNT_SCREEN));
    } catch {
      setError('root', {
        type: 'server',
        message: t('Validation.Проверьте правильность введенных данных'),
      });
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
