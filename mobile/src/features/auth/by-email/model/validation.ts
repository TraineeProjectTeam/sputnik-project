import * as yup from 'yup';
import i18n from 'i18next';
import { Regulars } from '@/shared/libs/regEx';
import { Role } from '@/shared/libs/types';

export const schema = yup.object().shape({
  email: yup
    .string()
    .email(i18n.t('Validation.Недопустимый адрес электронной почты'))
    .required(i18n.t('Validation.Это обязательно поле')),
  password: yup
    .string()
    .min(6, i18n.t('Validation.Пароль должен содержать как минимум 6 символов'))
    .max(30, i18n.t('Validation.Пароль может содержать максимум 30 символов'))
    .matches(
      Regulars.Password,
      i18n.t(
        'Validation.Пароль должен содержать только английские строчные, заглавные буквы и цифры',
      ),
    )
    .required(i18n.t('Validation.Это обязательно поле')),
  role: yup
    .mixed<Role>()
    .oneOf(Object.values(Role))
    .required(i18n.t('Validation.Это обязательно поле')),
});
