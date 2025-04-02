import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../i18n/en.json';
import frTranslation from '../i18n/fr.json';
import ukTranslation from '../i18n/uk.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
    uk: {
      translation: ukTranslation,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

