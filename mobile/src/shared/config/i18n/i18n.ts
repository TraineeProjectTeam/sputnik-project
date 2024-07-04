import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageList } from './types';

import en from '@/shared/assets/locales/en.json';
import ru from '@/shared/assets/locales/ru.json';

i18n.use(initReactI18next).init({
  lng: LanguageList.EN,
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
