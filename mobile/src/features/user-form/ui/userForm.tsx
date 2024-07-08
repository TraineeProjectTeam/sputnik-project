import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Layout, Spinner } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { TextStyles } from '@/shared/libs/textStyles';
import { Input } from '@/shared/ui/input';
import { storage } from '@/shared/libs/storage';

import { updateUserProps } from '../model/types';
import { schema } from '../model/validation';
import { useUserFormStore } from '../model/useUserFormStore';
import { useUserStore } from '@/entities/user';

export const UserForm = () => {
  const role = storage.getString('role');
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema(role)),
    mode: 'onChange',
  });

  const { updateUser, isLoading } = useUserFormStore();
  const { t } = useTranslation();
  const { user } = useUserStore();

  useEffect(() => {
    setValue('email', user.email, { shouldValidate: true });
    setValue('first_name', user.first_name, { shouldValidate: true });
    setValue('last_name', user.last_name, { shouldValidate: true });
    setValue('phone_number', user.phone_number, { shouldValidate: true });
    setValue('company_name', user.company_name, { shouldValidate: true });
  }, []);

  const onPressSend: SubmitHandler<updateUserProps> = (formData) => {
    updateUser(formData);
  };

  return (
    <Layout>
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
      {role === 'Vendor' && (
        <Input
          control={control}
          name="company_name"
          label={t('Form.Название компании')}
          error={errors.company_name}
        />
      )}
      <Button onPress={handleSubmit(onPressSend)} disabled={!isValid || isLoading}>
        <View>
          {isLoading ? (
            <Spinner status="control" size="small" />
          ) : (
            <Text style={TextStyles.button}>{t('Form.Сохранить')}</Text>
          )}
        </View>
      </Button>
    </Layout>
  );
};
