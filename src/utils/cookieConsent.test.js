import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initializeConsent, updateGtagConsent, getStoredConsent, setStoredConsent, COOKIE_CONSENT_KEY } from './cookieConsent';

describe('cookieConsent', () => {
    beforeEach(() => {
        // Clear localStorage and mock window.gtag
        localStorage.clear();
        window.gtag = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('getStoredConsent', () => {
        it('returns null when nothing is stored', () => {
            expect(getStoredConsent()).toBeNull();
        });

        it('returns parsed consent when stored', () => {
            const consent = { analytics: true, ads: false };
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
            expect(getStoredConsent()).toEqual(consent);
        });
    });

    describe('setStoredConsent', () => {
        it('stores stringified consent and updates gtag', () => {
            const consent = { analytics: false, ads: true };
            setStoredConsent(consent);

            expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe(JSON.stringify(consent));
            expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
                analytics_storage: 'denied',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
            });
        });
    });

    describe('updateGtagConsent', () => {
        it('does nothing if window.gtag is not a function', () => {
            delete window.gtag;
            // Should not throw an error
            expect(() => updateGtagConsent({ analytics: true, ads: true })).not.toThrow();
        });

        it('calls gtag with granted when analytics and ads are true', () => {
            updateGtagConsent({ analytics: true, ads: true });
            expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
            });
        });

        it('calls gtag with denied when analytics and ads are false', () => {
            updateGtagConsent({ analytics: false, ads: false });
            expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
            });
        });

        it('calls gtag with mixed values', () => {
            updateGtagConsent({ analytics: true, ads: false });
            expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
            });
        });
    });

    describe('initializeConsent', () => {
        it('does nothing if no consent is stored', () => {
            initializeConsent();
            expect(window.gtag).not.toHaveBeenCalled();
        });

        it('updates gtag if consent is stored', () => {
            const consent = { analytics: true, ads: true };
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));

            initializeConsent();

            expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
            });
        });
    });
});
