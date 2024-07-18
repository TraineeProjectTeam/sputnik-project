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
import { Select } from '@/shared/ui/select';
import { ErrorText } from '@/shared/ui/errorText';
import { Input } from '@/shared/ui/input';

import { schema } from '../model/validation';
import { AuthByPhoneProps } from '../model/types';
import { useAuthByPhoneStore } from '../model/useAuthByPhoneStore';

export const AuthByPhoneForm = () => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { authByPhone, isLoading } = useAuthByPhoneStore();

  const onPressSend: SubmitHandler<AuthByPhoneProps> = async (formData) => {
    try {
      await authByPhone(formData);
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
