import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-selector d-flex p-1 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-10">
            <button
                className={`btn btn-sm rounded-pill px-3 transition-smooth ${i18n.language === 'en' ? 'bg-primary text-white shadow-sm' : 'text-white border-0 opacity-50'}`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button
                className={`btn btn-sm rounded-pill px-3 transition-smooth ${i18n.language === 'es' || i18n.language.startsWith('es') ? 'bg-primary text-white shadow-sm' : 'text-white border-0 opacity-50'}`}
                onClick={() => changeLanguage('es')}
            >
                ES
            </button>
        </div>
    );
};

export default LanguageSelector;
