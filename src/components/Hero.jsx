import { Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="hero-section text-center py-4 mb-5" style={{ marginTop: '60px' }} id="home">
      <Container className="py-4">
        <div className="mb-4 d-inline-block">
          <img src="logo-alt.svg" alt="SmallPush Icon" width="90" height="90" className="img-fluid" />
        </div>
        <h1 className="text-fluid-xl mb-3">SmallPush</h1>
        <p className="lead mb-4 mx-auto" style={{ maxWidth: '640px' }}>
          {t('hero.subtitle')}
        </p>
        <Button
          as={HashLink}
          smooth
          to="/#contact"
          variant="primary"
          size="lg"
          className="shadow-sm px-5 py-3 rounded-3 fw-bold"
        >
          {t('hero.cta')}
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
