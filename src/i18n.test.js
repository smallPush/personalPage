import { describe, it, expect, vi } from 'vitest';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';
import ca from './locales/ca.json';

vi.mock('i18next', () => {
    const useMock = vi.fn().mockReturnThis();
    const initMock = vi.fn().mockReturnThis();
    return {
        default: {
            use: useMock,
            init: initMock,
        }
    };
});

vi.mock('react-i18next', () => ({
    initReactI18next: {}
}));

vi.mock('i18next-browser-languagedetector', () => ({
    default: {}
}));

describe('i18n initialization', () => {
    it('initializes i18next with correct configuration', async () => {
        await import('./i18n.js');

        expect(i18n.use).toHaveBeenCalledWith(LanguageDetector);
        expect(i18n.use).toHaveBeenCalledWith(initReactI18next);

        expect(i18n.init).toHaveBeenCalledWith({
            resources: {
                en: { translation: en },
                es: { translation: es },
                ca: { translation: ca }
            },
            fallbackLng: 'es',
            interpolation: {
                escapeValue: false
            }
        });
    });
});
