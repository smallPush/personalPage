import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.civi.title'),
      text: t('services.civi.text')
    },
    {
      title: t('services.drupal.title'),
      text: t('services.drupal.text')
    },
    {
      title: t('services.payment.title'),
      text: t('services.payment.text')
    },
    {
      title: t('services.fiscal.title'),
      text: t('services.fiscal.text')
    }
  ];

  return (
    <section id="services" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">{t('services.title')}</h2>
        <Row>
          {services.map((service, index) => (
            <Col md={6} lg={3} className="mb-4" key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>
                    {service.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
