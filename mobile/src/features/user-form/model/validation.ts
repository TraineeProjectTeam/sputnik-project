import * as yup from 'yup';
import { Regulars } from '@/shared/libs/regEx';
import i18n from '@/shared/config/i18n';

export const schema = (role: string | undefined) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(i18n.t('Validation.Недопустимый адрес электронной почты'))
      .required(i18n.t('Validation.Это обязательно поле')),
    first_name: yup
      .string()
      .matches(Regulars.Name, i18n.t('Validation.Имя должно содержать только буквы'))
      .required(i18n.t('Validation.Это обязательно поле')),
    last_name: yup
      .string()
      .matches(Regulars.Name, i18n.t('Validation.Фамилия должна содержать только буквы'))
      .required(i18n.t('Validation.Это обязательно поле')),
    phone_number: yup
      .string()
      .matches(
        Regulars.Phone,
        i18n.t('Validation.Номер телефона должен быть в формате +1234567890'),
      )
      .required(i18n.t('Validation.Это обязательно поле')),
    company_name: yup.string().when([], (key, schema) => {
      return role === 'Vendor'
        ? schema.required(i18n.t('Validation.Это обязательно поле'))
        : schema.notRequired();
    }),
  });
};
