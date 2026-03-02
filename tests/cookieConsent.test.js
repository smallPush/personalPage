import test, { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';

describe('updateGtagConsent', () => {
    let updateGtagConsent;

    beforeEach(async () => {
        // Reset globals
        global.window = {};
        global.localStorage = {
            getItem: () => null,
            setItem: () => {}
        };

        // Dynamically import the module so it uses the updated globals
        const module = await import('../src/utils/cookieConsent.js?t=' + Date.now());
        updateGtagConsent = module.updateGtagConsent;
    });

    it('does nothing if window.gtag is not a function', () => {
        // Should not throw
        updateGtagConsent({ analytics: true, ads: true });
        assert.ok(true);
    });

    it('calls window.gtag with correct arguments when analytics and ads are granted', () => {
        let calledWith = null;
        global.window.gtag = (command, action, params) => {
            calledWith = { command, action, params };
        };

        updateGtagConsent({ analytics: true, ads: true });

        assert.deepStrictEqual(calledWith, {
            command: 'consent',
            action: 'update',
            params: {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            }
        });
    });

    it('calls window.gtag with correct arguments when analytics and ads are denied', () => {
        let calledWith = null;
        global.window.gtag = (command, action, params) => {
            calledWith = { command, action, params };
        };

        updateGtagConsent({ analytics: false, ads: false });

        assert.deepStrictEqual(calledWith, {
            command: 'consent',
            action: 'update',
            params: {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            }
        });
    });

    it('calls window.gtag with correct arguments for a mix of granted and denied consents', () => {
        let calledWith = null;
        global.window.gtag = (command, action, params) => {
            calledWith = { command, action, params };
        };

        updateGtagConsent({ analytics: true, ads: false });

        assert.deepStrictEqual(calledWith, {
            command: 'consent',
            action: 'update',
            params: {
                'analytics_storage': 'granted',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            }
        });
    });
});
