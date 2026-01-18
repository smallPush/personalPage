import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getStoredConsent, setStoredConsent } from '../utils/cookieConsent';
import './CookieBanner.css';

const CookieSettings = ({ isOpen, onClose, onSave, currentConsent }) => {
    const { t } = useTranslation();
    const [preferences, setPreferences] = useState(currentConsent || { analytics: false, ads: false });

    if (!isOpen) return null;

    const handleToggle = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="cookie-modal-overlay">
            <div className="cookie-modal">
                <h2>{t('cookies.settings.title')}</h2>
                <p>{t('cookies.settings.description')}</p>

                <div className="cookie-setting-item">
                    <div className="cookie-setting-header">
                        <label>{t('cookies.settings.necessary.label')}</label>
                        <label className="switch">
                            <input type="checkbox" checked disabled />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <p>{t('cookies.settings.necessary.desc')}</p>
                </div>

                <div className="cookie-setting-item">
                    <div className="cookie-setting-header">
                        <label>{t('cookies.settings.analytics.label')}</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={preferences.analytics}
                                onChange={() => handleToggle('analytics')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <p>{t('cookies.settings.analytics.desc')}</p>
                </div>

                <div className="cookie-banner-buttons">
                    <button className="cookie-btn cookie-btn-primary" onClick={() => onSave(preferences)}>
                        {t('cookies.settings.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const CookieBanner = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const consent = getStoredConsent();
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        const consent = { analytics: true, ads: true };
        setStoredConsent(consent);
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        const consent = { analytics: false, ads: false };
        setStoredConsent(consent);
        setIsVisible(false);
    };

    const handleSaveSettings = (preferences) => {
        setStoredConsent(preferences);
        setIsModalOpen(false);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className="cookie-banner">
                <div className="cookie-banner-content">
                    <p>{t('cookies.banner.text')}</p>
                </div>
                <div className="cookie-banner-buttons">
                    <button className="cookie-btn cookie-btn-text" onClick={() => setIsModalOpen(true)}>
                        {t('cookies.banner.settings')}
                    </button>
                    <button className="cookie-btn cookie-btn-secondary" onClick={handleRejectAll}>
                        {t('cookies.banner.rejectAll')}
                    </button>
                    <button className="cookie-btn cookie-btn-primary" onClick={handleAcceptAll}>
                        {t('cookies.banner.acceptAll')}
                    </button>
                </div>
            </div>
            <CookieSettings
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSettings}
                currentConsent={getStoredConsent()}
            />
        </>
    );
};

export default CookieBanner;
