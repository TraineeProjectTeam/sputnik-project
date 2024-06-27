import * as yup from 'yup';
import { Regulars } from '@/shared/libs/regEx';

export const schema = yup.object().shape({
  email: yup
    .string()
    .email('Недопустимый адрес электронной почты')
    .required('Это обязательно поле'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать как минимум 6 символов')
    .max(30, 'Пароль может содежать только из 30 символов')
    .matches(
      Regulars.Password,
      'Пароль должен содержать только английские прописные, заглавные буквы и цифры.',
    )
    .required('Это обязательно поле'),
  role: yup.string().required('Это обязательно поле'),
});
