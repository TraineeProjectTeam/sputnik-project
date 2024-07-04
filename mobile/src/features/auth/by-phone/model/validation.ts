import * as yup from 'yup';
import i18n from 'i18next';
import { Regulars } from '@/shared/libs/regEx';
import { Role } from '@/shared/libs/types';

export const schema = yup.object().shape({
  phone_number: yup
    .string()
    .matches(Regulars.Phone, i18n.t('Validation.Номер телефона должен быть в формате: +1234567890'))
    .required(i18n.t('Validation.Это обязательно поле')),
  password: yup
    .string()
    .min(6, i18n.t('Validation.Пароль должен содержать как минимум 6 символов'))
    .max(30, i18n.t('Validation.Пароль может содежать только из 30 символов'))
    .matches(
      Regulars.Password,
      i18n.t(
        'Validation.Пароль должен содержать только английские строчные, заглавные буквы и цифры',
      ),
    )
    .required('Validation.Это обязательно поле'),
  role: yup
    .mixed<Role>()
    .oneOf(Object.values(Role))
    .required(i18n.t('Validation.Это обязательно поле')),
});
