import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18next.use(LanguageDetector).use(Backend).use(initReactI18next).init({
  returnObjects: true,
  fallbackLng: 'en-US',
  debug: true,
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json', // Ensures correct loading path
  },
});
