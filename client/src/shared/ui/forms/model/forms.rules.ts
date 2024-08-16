import { Rule } from 'antd/es/form';
import { TFunction } from 'i18next';

interface IRulesForFormItems {
  [key: string]: Rule[];
}

export const rulesForFormItems = (t: TFunction): IRulesForFormItems => {
  return {
    phone: [
      {
        type: 'string',
        message: t('Номер телефона должен быть в формате +1234567890!'),
      },
      {
        pattern: /\+\d{11}/,
        message: t('Номер телефона должен быть в формате +1234567890!'),
      },
      {
        required: true,
        message: t('Пожалуйста, введите номер телефона!'),
      },
    ],
    email: [
      {
        type: 'email',
        message: t('Введен неккоректный адрес E-mail!'),
      },
      {
        required: true,
        message: t('Пожалуйста, введите E-mail!'),
      },
    ],
    password: [
      {
        required: true,
        message: t('Пожалуйста, введите пароль!'),
      },
      {
        pattern: /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё\d]{6,}$/,
        message: t(
          'Пароль должен содержать хотя бы 1 цифру и 1 букву, и быть длиной не менее 6 символов!',
        ),
      },
    ],
    firstName: [
      {
        required: true,
        message: t('Пожалуйста, введите имя!'),
      },
      {
        pattern: /^[A-Za-zА-Яа-яЁё]+$/,
        message: t('Имя может содержать только буквы!'),
      },
    ],
    lastName: [
      {
        required: true,
        message: t('Пожалуйста, введите фамилию!'),
      },
      {
        pattern: /^[A-Za-zА-Яа-яЁё]+$/,
        message: t('Фамилия может содержать только буквы!'),
      },
    ],
    role: [
      {
        required: true,
        message: t('Пожалуйста, выберите роль!'),
      },
    ],
    company_name: [
      {
        required: true,
        message: t('Пожалуйста, введите компанию!'),
      },
    ],
  };
};
