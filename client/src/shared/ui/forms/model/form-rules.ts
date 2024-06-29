import { Rule } from 'antd/es/form';

interface IRulesForFormItems {
  [key: string]: Rule[];
}

export const rulesForFormItems: IRulesForFormItems = {
  phone: [
    {
      type: 'string',
      message: 'Введите валидный номер телефона!',
    },
    {
      pattern: /\+\d{11}/,
      message: 'Введите ввалидный номер телефона! формат: +79099099900',
    },
    {
      required: true,
      message: 'Введите ваш номер телефона!',
    },
  ],
  email: [
    {
      type: 'email',
      message: 'Введен неккоректный адрес E-mail!',
    },
    {
      required: true,
      message: 'Введите ваш E-mail!',
    },
  ],
  password: [
    {
      required: true,
      message: 'Введите ваш пароль!',
    },
    {
      pattern: /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё\d]{6,}$/,
      message:
        'Пароль должен содержать хотя бы 1 цифру и 1 букву, и быть длиной не менее 6 символов!',
    },
  ],
  firstName: [
    {
      required: true,
      message: 'Введите ваше имя!',
    },
    {
      pattern: /^[A-Za-zА-Яа-яЁё]+$/,
      message: 'Имя может содержать только буквы!',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Введите вашу фамилию!',
    },
    {
      pattern: /^[A-Za-zА-Яа-яЁё]+$/,
      message: 'Фамилия может содержать только буквы!',
    },
  ],
};
