import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import translation files
import commonDE from './locales/de/common.json';
import commonEN from './locales/en/common.json';
import commonFR from './locales/fr/common.json';
import commonIT from './locales/it/common.json';

import homeDE from './locales/de/home.json';
import homeEN from './locales/en/home.json';
import homeFR from './locales/fr/home.json';
import homeIT from './locales/it/home.json';

import venuesDE from './locales/de/venues.json';
import venuesEN from './locales/en/venues.json';
import venuesFR from './locales/fr/venues.json';
import venuesIT from './locales/it/venues.json';

import casesDE from './locales/de/cases.json';
import casesEN from './locales/en/cases.json';
import casesFR from './locales/fr/cases.json';
import casesIT from './locales/it/cases.json';

import caseDashboardDE from './locales/de/caseDashboard.json';
import caseDashboardEN from './locales/en/caseDashboard.json';
import caseDashboardFR from './locales/fr/caseDashboard.json';
import caseDashboardIT from './locales/it/caseDashboard.json';

import legalDE from './locales/de/legal.json';
import legalEN from './locales/en/legal.json';
import legalFR from './locales/fr/legal.json';
import legalIT from './locales/it/legal.json';

import registerDE from './locales/de/register.json';
import registerEN from './locales/en/register.json';
import registerFR from './locales/fr/register.json';
import registerIT from './locales/it/register.json';

import venueRegisterDE from './locales/de/venueRegister.json';
import venueRegisterEN from './locales/en/venueRegister.json';
import venueRegisterFR from './locales/fr/venueRegister.json';
import venueRegisterIT from './locales/it/venueRegister.json';

import emailsDE from './locales/de/emails.json';
import emailsEN from './locales/en/emails.json';
import emailsFR from './locales/fr/emails.json';
import emailsIT from './locales/it/emails.json';

import vacationRentalDashboardDE from './locales/de/vacationRentalDashboard.json';
import vacationRentalDashboardEN from './locales/en/vacationRentalDashboard.json';
import vacationRentalDashboardFR from './locales/fr/vacationRentalDashboard.json';
import vacationRentalDashboardIT from './locales/it/vacationRentalDashboard.json';

import contactDE from './locales/de/contact.json';
import contactEN from './locales/en/contact.json';
import contactFR from './locales/fr/contact.json';
import contactIT from './locales/it/contact.json';

import createAutopsyReportRequestDE from './locales/de/createAutopsyReportRequest.json';
import createAutopsyReportRequestEN from './locales/en/createAutopsyReportRequest.json';
import createAutopsyReportRequestFR from './locales/fr/createAutopsyReportRequest.json';
import createAutopsyReportRequestIT from './locales/it/createAutopsyReportRequest.json';

import profileDE from './locales/de/profile.json';
import profileEN from './locales/en/profile.json';
import profileFR from './locales/fr/profile.json';
import profileIT from './locales/it/profile.json';

import faqDE from './locales/de/faq.json';
import faqEN from './locales/en/faq.json';
import faqFR from './locales/fr/faq.json';
import faqIT from './locales/it/faq.json';

import useMyUserProfilePasswordDE from './locales/de/useMyUserProfilePassword.json';
import useMyUserProfilePasswordEN from './locales/en/useMyUserProfilePassword.json';
import useMyUserProfilePasswordFR from './locales/fr/useMyUserProfilePassword.json';
import useMyUserProfilePasswordIT from './locales/it/useMyUserProfilePassword.json';

const resources = {
  de: {
    common: commonDE,
    home: homeDE,
    venues: venuesDE,
    cases: casesDE,
    caseDashboard: caseDashboardDE,
    legal: legalDE,
    register: registerDE,
    venueRegister: venueRegisterDE,
    emails: emailsDE,
    vacationRentalDashboard: vacationRentalDashboardDE,
    contact: contactDE,
    createAutopsyReportRequest: createAutopsyReportRequestDE,
    profile: profileDE,
    faq: faqDE,
    useMyUserProfilePassword: useMyUserProfilePasswordDE,
  },
  en: {
    common: commonEN,
    home: homeEN,
    venues: venuesEN,
    cases: casesEN,
    caseDashboard: caseDashboardEN,
    legal: legalEN,
    register: registerEN,
    venueRegister: venueRegisterEN,
    emails: emailsEN,
    vacationRentalDashboard: vacationRentalDashboardEN,
    contact: contactEN,
    createAutopsyReportRequest: createAutopsyReportRequestEN,
    profile: profileEN,
    faq: faqEN,
    useMyUserProfilePassword: useMyUserProfilePasswordEN,
  },
  it: {
    common: commonIT,
    home: homeIT,
    venues: venuesIT,
    cases: casesIT,
    caseDashboard: caseDashboardIT,
    legal: legalIT,
    register: registerIT,
    venueRegister: venueRegisterIT,
    emails: emailsIT,
    vacationRentalDashboard: vacationRentalDashboardIT,
    contact: contactIT,
    createAutopsyReportRequest: createAutopsyReportRequestIT,
    profile: profileIT,
    faq: faqIT,
    useMyUserProfilePassword: useMyUserProfilePasswordIT,
  },
  fr: {
    common: commonFR,
    home: homeFR,
    venues: venuesFR,
    cases: casesFR,
    caseDashboard: caseDashboardFR,
    legal: legalFR,
    register: registerFR,
    venueRegister: venueRegisterFR,
    emails: emailsFR,
    vacationRentalDashboard: vacationRentalDashboardFR,
    contact: contactFR,
    createAutopsyReportRequest: createAutopsyReportRequestFR,
    profile: profileFR,
    faq: faqFR,
    useMyUserProfilePassword: useMyUserProfilePasswordFR,
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
