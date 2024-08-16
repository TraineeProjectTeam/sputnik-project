import { TFunction } from 'i18next';
import { IProfileCard, IUserProfile } from '../model/profile-card.types';

export const getProfileCardFields = (t: TFunction, editableUser: IUserProfile): IProfileCard[] => {
  return [
    {
      label: t('Имя'),
      name: 'first_name',
      value: editableUser.first_name,
      rules: [
        {
          type: 'string',
          required: true,
          message: t('Пожалуйста, введите имя!'),
        },
      ],
    },
    {
      label: t('Фамилия'),
      name: 'last_name',
      value: editableUser.last_name,
      rules: [
        {
          type: 'string',
          required: true,
          message: t('Пожалуйста, введите фамилию!'),
        },
      ],
    },
    {
      label: t('Почта'),
      name: 'email',
      value: editableUser.email,
      rules: [
        {
          required: true,
          type: 'email',
          message: t('Пожалуйста, введите валидную почту!'),
        },
      ],
    },
    {
      label: t('Номер телефона'),
      name: 'phone_number',
      value: editableUser.phone_number,
      rules: [
        {
          required: true,
          message: t('Пожалуйста, введите номер телефона!'),
        },
        {
          pattern: /^\+\d{10,15}$/,
          message: t('Номер телефона должен быть в формате +1234567890!'),
        },
      ],
    },
    {
      label: t('Компания'),
      name: 'company_name',
      value: editableUser.company_name,
      rules: [
        {
          type: 'string',
          required: true,
          message: t('Пожалуйста, введите компанию!'),
        },
      ],
    },
  ];
};

export const getProfileCardAddressFields = (
  t: TFunction,
  editableUser: IUserProfile,
): IProfileCard[] => {
  return [
    {
      label: t('Адрес.Улица'),
      name: 'street_name',
      value: editableUser.address?.street_name,
      rules: [
        {
          type: 'string',
        },
      ],
    },
    {
      label: t('Адрес.Номер дома'),
      name: 'street_number',
      value: editableUser.address?.street_number,
      rules: [
        {
          type: 'string',
        },
      ],
    },
    {
      label: t('Адрес.Город'),
      name: 'city',
      value: editableUser.address?.city,
      rules: [
        {
          type: 'string',
        },
      ],
    },
    {
      label: t('Адрес.Регион'),
      name: 'region',
      value: editableUser.address?.region,
      rules: [
        {
          type: 'string',
        },
      ],
    },
  ];
};
