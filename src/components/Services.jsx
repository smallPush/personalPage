import React, { useMemo, useState } from 'react';
import { Row, Col, Collapse, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';
import useScrollReveal from '../hooks/useScrollReveal';

const Services = () => {
  const { t } = useTranslation();

  const services = useMemo(() => [
    { title: t('services.civi.title'), text: t('services.civi.text'), details: t('services.civi.details'), icon: '📊' },
    { title: t('services.drupal.title'), text: t('services.drupal.text'), details: t('services.drupal.details'), icon: '💧' },
    { title: t('services.payment.title'), text: t('services.payment.text'), details: t('services.payment.details'), icon: '💳' },
    { title: t('services.fiscal.title'), text: t('services.fiscal.text'), details: t('services.fiscal.details'), icon: '🧾' },
    { title: t('services.ads.title'), text: t('services.ads.text'), details: t('services.ads.details'), icon: '📈' },
    { title: t('services.ai.title'), text: t('services.ai.text'), details: t('services.ai.details'), icon: '🤖' }
  ], [t]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleService = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const sectionRef = useScrollReveal();

  return (
    <div ref={sectionRef} className="reveal-hidden">
      <h2 className="text-fluid-lg text-center mb-5">{t('services.title')}</h2>
      <Row className="g-4">
        {services.map((service, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <Col md={6} lg={4} key={index}>
              <GlassContainer 
                className={`h-100 p-4 d-flex flex-column align-items-center text-center transition-all ${isExpanded ? 'shadow-lg border-primary bg-primary bg-opacity-10' : ''}`}
                onClick={() => toggleService(index)}
                style={{ cursor: 'pointer', transform: isExpanded ? 'translateY(-5px)' : 'none' }}
              >
                <div className="fs-1 mb-3">{service.icon}</div>
                <h4 className={`mb-3 transition-all ${isExpanded ? 'text-primary' : ''}`}>{service.title}</h4>
                <p className={`small mb-0 transition-all ${isExpanded ? 'opacity-100' : 'opacity-75'}`}>
                  {service.text}
                </p>
                
                <Collapse in={isExpanded}>
                  <div className="mt-3 text-start w-100">
                    <hr className="opacity-25 my-3 border-primary" />
                    <p className="mb-0 fs-6 fw-medium text-dark">{service.details}</p>
                  </div>
                </Collapse>

                <div className="mt-auto pt-4">
                  <Badge 
                    bg={isExpanded ? 'primary' : 'light'} 
                    text={isExpanded ? 'white' : 'dark'}
                    className={`px-3 py-2 rounded-pill transition-all border ${!isExpanded ? 'border-secondary-subtle' : 'border-primary'}`}
                  >
                    {isExpanded ? `${t('services.collapse')} ▲` : `${t('services.expand')} ▼`}
                  </Badge>
                </div>
              </GlassContainer>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Services;
