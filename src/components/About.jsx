import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';
import useScrollReveal from '../hooks/useScrollReveal';

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal();

  return (
    <div className="row justify-content-center reveal-hidden" ref={sectionRef}>
      <div className="col-lg-10">
        <GlassContainer className="about-card text-center p-5">
          <h2 className="text-fluid-lg mb-4">{t('about.title')}</h2>
          <p className="lead mx-auto mb-4" style={{ maxWidth: '800px' }}>
            {t('about.text')}
          </p>
          <div className="row g-4 mt-2 text-start">
            <div className="col-md-6">
              <div className="p-3 rounded-3 h-100 bg-white bg-opacity-5 border border-white border-opacity-10">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-clock-rotate-left text-primary fs-5 me-2"></i>
                  <h3 className="h6 fw-bold mb-0">{t('about.pillars.experience.title', '+14 Años en el Tercer Sector')}</h3>
                </div>
                <p className="small text-muted mb-0">{t('about.pillars.experience.desc', 'Conocemos el día a día y los retos de ONGs y fundaciones.')}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 rounded-3 h-100 bg-white bg-opacity-5 border border-white border-opacity-10">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-building-columns text-primary fs-5 me-2"></i>
                  <h3 className="h6 fw-bold mb-0">{t('about.pillars.fiscal.title', 'Ecosistema Español y Modelo 182')}</h3>
                </div>
                <p className="small text-muted mb-0">{t('about.pillars.fiscal.desc', 'Integración con Redsys, Bizum, SEPA y Modelo 182 para la AEAT.')}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 rounded-3 h-100 bg-white bg-opacity-5 border border-white border-opacity-10">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-lock-open text-primary fs-5 me-2"></i>
                  <h3 className="h6 fw-bold mb-0">{t('about.pillars.openSource.title', 'Soberanía de Datos (Open Source)')}</h3>
                </div>
                <p className="small text-muted mb-0">{t('about.pillars.openSource.desc', 'Tus datos son tuyos con CiviCRM y Drupal, sin pagar licencias por contacto.')}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 rounded-3 h-100 bg-white bg-opacity-5 border border-white border-opacity-10">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-wand-magic-sparkles text-primary fs-5 me-2"></i>
                  <h3 className="h6 fw-bold mb-0">{t('about.pillars.automation.title', 'Automatización e IA Práctica')}</h3>
                </div>
                <p className="small text-muted mb-0">{t('about.pillars.automation.desc', 'Captación conectada al CRM y agentes que ahorran horas de trabajo.')}</p>
              </div>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
};

export default About;
