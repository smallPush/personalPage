import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import ca from './locales/ca.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            es: {
                translation: es
            },
            ca: {
                translation: ca
            }
        },
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
});

// Set initial language
if (i18n.language) {
    document.documentElement.lang = i18n.language;
}

export default i18n;
