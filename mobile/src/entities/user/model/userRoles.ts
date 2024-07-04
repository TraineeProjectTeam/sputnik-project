import i18n from 'i18next';
import { Role } from '@/shared/libs/types';

export const userRoles = [
  {
    value: Role.CUSTOMER,
    label: i18n.t('Role.Покупатель'),
  },
  {
    value: Role.VENDOR,
    label: i18n.t('Role.Продавец'),
  },
];
