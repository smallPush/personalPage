export const COOKIE_CONSENT_KEY = 'cookie-consent-preferences';

export const getStoredConsent = () => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const setStoredConsent = (consent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    updateGtagConsent(consent);
};

export const updateGtagConsent = (consent) => {
    if (typeof window.gtag !== 'function') return;

    window.gtag('consent', 'update', {
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'ad_storage': consent.ads ? 'granted' : 'denied',
        // Optional: you can add more based on requirements
    });
};

export const initializeConsent = () => {
    const consent = getStoredConsent();
    if (consent) {
        updateGtagConsent(consent);
    }
};
