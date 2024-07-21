import { TFunction } from "i18next";
import { IProfileCard, IUserProfile } from "../model/profile-card.types";
import { EnumRoutesName } from "shared/config";
import { getProfileRoutes } from "app";

const getTranslationProfileLink = (route: string, tCom: TFunction) => {
  switch (route) {
    case (EnumRoutesName.ORDERS): {
      return tCom('Заказы')
    }
  }
}

export const getProfileLinks = (tCom: TFunction) => {
  return getProfileRoutes().map((route) => {
    return {
      url: route,
      label: getTranslationProfileLink(route, tCom)
    };
  });
}

export const getProfileCardFields = (
  tErr: TFunction,
  tCom: TFunction,
  editableUser: IUserProfile,
): IProfileCard[] => {
  return [
    {
      label: tCom('Имя'),
      name: 'first_name',
      value: editableUser.first_name,
      rules: [
        {
          required: true,
          message: tErr('Пожалуйста, введите имя!'),
        },
      ],
    },
    {
      label: tCom('Фамилия'),
      name: 'last_name',
      value: editableUser.last_name,
      rules: [
        {
          required: true,
          message: tErr('Пожалуйста, введите фамилию!'),
        },
      ],
    },
    {
      label: tCom('Почта'),
      name: 'email',
      value: editableUser.email,
      rules: [
        {
          required: true,
          type: 'email',
          message: tErr('Пожалуйста, введите валидную почту!'),
        },
      ],
    },
    {
      label: tCom('Номер телефона'),
      name: 'phone_number',
      value: editableUser.phone_number,
      rules: [
        {
          required: true,
          message: tErr('Пожалуйста, введите номер телефона!'),
        },
        {
          pattern: /^\+\d{10,15}$/,
          message: tErr('Номер телефона должен быть в формате +1234567890!'),
        },
      ],
    },
    {
      label: tCom('Компания'),
      name: 'company_name',
      value: editableUser.company_name,
      rules: [
        {
          required: true,
          message: tErr('Пожалуйста, введите компанию!'),
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
    },
    {
      label: t('Адрес.Номер дома'),
      name: 'street_number',
      value: editableUser.address?.street_number,
    },
    {
      label: t('Адрес.Город'),
      name: 'city',
      value: editableUser.address?.city,
    },
    {
      label: t('Адрес.Регион'),
      name: 'region',
      value: editableUser.address?.region,
    },
  ];
};