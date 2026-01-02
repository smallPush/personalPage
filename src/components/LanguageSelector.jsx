import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <ButtonGroup size="sm" className="ms-3">
            <Button
                variant={i18n.language === 'en' ? 'primary' : 'outline-primary'}
                onClick={() => changeLanguage('en')}
            >
                EN
            </Button>
            <Button
                variant={i18n.language === 'es' || i18n.language.startsWith('es') ? 'primary' : 'outline-primary'}
                onClick={() => changeLanguage('es')}
            >
                ES
            </Button>
        </ButtonGroup>
    );
};

export default LanguageSelector;
