import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="hero-section text-white text-center py-5 mb-4" style={{ marginTop: '56px' }} id="home">
      <Container className="py-5">
        <div className="mb-4">
          <img src="/logo-alt.svg" alt="SmallPush Icon" width="120" height="120" />
        </div>
        <h1 className="display-4 fw-bold">SmallPush</h1>
        <p className="lead mb-4">
          {t('hero.subtitle')}
        </p>
        <Button variant="primary" size="lg" href="#contact">{t('hero.cta')}</Button>
      </Container>
    </div>
  );
};

export default Hero;
