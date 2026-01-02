import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <h2 className="text-center mb-4">{t('about.title')}</h2>
            <p className="lead text-center">
              {t('about.text')}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
