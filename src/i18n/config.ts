import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonDE from './locales/de/common.json';
import commonEN from './locales/en/common.json';
import commonIT from './locales/it/common.json';
import commonFR from './locales/fr/common.json';

import homeDE from './locales/de/home.json';
import homeEN from './locales/en/home.json';
import homeIT from './locales/it/home.json';
import homeFR from './locales/fr/home.json';

import venuesDE from './locales/de/venues.json';
import venuesEN from './locales/en/venues.json';
import venuesIT from './locales/it/venues.json';
import venuesFR from './locales/fr/venues.json';

import casesDE from './locales/de/cases.json';
import casesEN from './locales/en/cases.json';
import casesIT from './locales/it/cases.json';
import casesFR from './locales/fr/cases.json';

import caseDashboardDE from './locales/de/caseDashboard.json';
import caseDashboardEN from './locales/en/caseDashboard.json';
import caseDashboardIT from './locales/it/caseDashboard.json';
import caseDashboardFR from './locales/fr/caseDashboard.json';

const resources = {
  de: {
    common: commonDE,
    home: homeDE,
    venues: venuesDE,
    cases: casesDE,
    caseDashboard: caseDashboardDE,
  },
  en: {
    common: commonEN,
    home: homeEN,
    venues: venuesEN,
    cases: casesEN,
    caseDashboard: caseDashboardEN,
  },
  it: {
    common: commonIT,
    home: homeIT,
    venues: venuesIT,
    cases: casesIT,
    caseDashboard: caseDashboardIT,
  },
  fr: {
    common: commonFR,
    home: homeFR,
    venues: venuesFR,
    cases: casesFR,
    caseDashboard: caseDashboardFR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
