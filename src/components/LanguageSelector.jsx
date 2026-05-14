import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-selector d-flex p-1 rounded-pill">
            <button
                className={`btn btn-sm rounded-pill px-3 transition-smooth ${i18n.language === 'en' ? 'bg-primary text-white shadow-sm' : 'border-0 opacity-75'}`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button
                className={`btn btn-sm rounded-pill px-3 transition-smooth ${i18n.language === 'es' || i18n.language.startsWith('es') ? 'bg-primary text-white shadow-sm' : 'border-0 opacity-75'}`}
                onClick={() => changeLanguage('es')}
            >
                ES
            </button>
            <button
                className={`btn btn-sm rounded-pill px-3 transition-smooth ${i18n.language === 'ca' || i18n.language.startsWith('ca') ? 'bg-primary text-white shadow-sm' : 'border-0 opacity-75'}`}
                onClick={() => changeLanguage('ca')}
            >
                CA
            </button>
        </div>
    );
};

export default LanguageSelector;
