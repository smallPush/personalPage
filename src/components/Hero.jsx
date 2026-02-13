import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="hero-section text-white text-center py-5 mb-5" style={{ marginTop: '100px' }} id="home">
      <Container className="py-5">
        <div className="mb-5 position-relative d-inline-block">
          <div
            className="position-absolute top-50 left-50 translate-middle rounded-circle shadow-lg"
            style={{
              width: '140%',
              height: '140%',
              background: 'var(--accent-glow)',
              filter: 'blur(40px)',
              zIndex: -1
            }}
          ></div>
          <img src="logo-alt.svg" alt="SmallPush Icon" width="160" height="160" className="img-fluid" />
        </div>
        <h1 className="text-fluid-xl mb-3">SmallPush</h1>
        <p className="lead mb-5 mx-auto" style={{ maxWidth: '600px', opacity: 0.9 }}>
          {t('hero.subtitle')}
        </p>
        <Button
          as={HashLink}
          smooth
          to="/#contact"
          variant="primary"
          size="lg"
          className="shadow-lg px-5 py-3 rounded-pill fw-bold"
        >
          {t('hero.cta')}
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
