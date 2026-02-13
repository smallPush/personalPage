import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    { title: t('services.civi.title'), text: t('services.civi.text'), icon: '📊' },
    { title: t('services.drupal.title'), text: t('services.drupal.text'), icon: '💧' },
    { title: t('services.payment.title'), text: t('services.payment.text'), icon: '💳' },
    { title: t('services.fiscal.title'), text: t('services.fiscal.text'), icon: '🧾' },
    { title: t('services.ads.title'), text: t('services.ads.text'), icon: '📈' },
    { title: t('services.ai.title'), text: t('services.ai.text'), icon: '🤖' }
  ];

  return (
    <div>
      <h2 className="text-fluid-lg text-center mb-5">{t('services.title')}</h2>
      <Row className="g-4">
        {services.map((service, index) => (
          <Col md={6} lg={4} key={index}>
            <GlassContainer className="h-100 p-4 d-flex flex-column align-items-center text-center">
              <div className="fs-1 mb-3">{service.icon}</div>
              <h4 className="mb-3">{service.title}</h4>
              <p className="small opacity-75 mb-0">
                {service.text}
              </p>
            </GlassContainer>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Services;
