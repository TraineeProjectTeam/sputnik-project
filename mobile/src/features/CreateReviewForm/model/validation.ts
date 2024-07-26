import * as yup from 'yup';
import i18n from '@/shared/config/i18n';

export const schema = yup.object().shape({
  body: yup.string().required(i18n.t('Validation.Это обязательно поле')),
});
