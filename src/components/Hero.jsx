import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';
import useScrollReveal from '../hooks/useScrollReveal';

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useScrollReveal();

  return (
    <div className="hero-section text-center py-4 mb-5 reveal-hidden" style={{ marginTop: '60px' }} id="home" ref={sectionRef}>
      <Container className="py-4">
        <div className="mb-4 d-inline-block">
          <img src="logo-alt.svg" alt="SmallPush Icon" width="90" height="90" className="img-fluid" />
        </div>
        <h1 className="text-fluid-xl mb-3 mt-2">SmallPush</h1>
        <p className="hero-subtitle mb-4 mx-auto" style={{ maxWidth: '720px' }}>
          {t('hero.subtitle')}
        </p>
        {t('hero.tagline', { defaultValue: '' }) && (
          <p className="hero-tagline small mb-4 fw-semibold mx-auto">
            {t('hero.tagline')}
          </p>
        )}
        <Button
          as={HashLink}
          smooth
          to="/#contact"
          variant="primary"
          size="lg"
          className="shadow-sm px-5 py-3 rounded-3 fw-bold fs-5 mt-2"
        >
          {t('hero.cta')}
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
