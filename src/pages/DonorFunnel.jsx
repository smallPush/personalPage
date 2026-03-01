import { Container, Row, Col, Badge, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';
import GlassContainer from '../components/GlassContainer';
import useSeo from '../utils/useSeo';

const EcosystemCard = ({ icon, title, role, desc }) => (
  <Card className="h-100 bg-dark bg-opacity-25 border-white border-opacity-10 rounded-4 overflow-hidden shadow-lg transition-all hover-translate-y">
    <Card.Body className="p-4 d-flex flex-column align-items-center text-center">
      <div className="mb-4 p-3 rounded-circle bg-primary bg-opacity-10 text-primary">
        <i className={`fa-solid ${icon} fa-2x`}></i>
      </div>
      <h4 className="fw-bold mb-1">{title}</h4>
      <div className="text-primary small fw-bold text-uppercase mb-3 tracking-wider">{role}</div>
      <p className="text-white-50 mb-0">{desc}</p>
    </Card.Body>
  </Card>
);

const TimelineItem = ({ phase, title, desc, isLast }) => (
  <div className="d-flex mb-5 last-mb-0 position-relative">
    {!isLast && (
      <div
        className="position-absolute start-0 h-100 border-start border-primary border-opacity-25 ms-3 mt-4"
        style={{ top: '10px' }}
      ></div>
    )}
    <div className="flex-shrink-0 z-1">
      <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center shadow-primary" style={{ width: '40px', height: '40px' }}>
        <span className="text-dark fw-bold">{phase}</span>
      </div>
    </div>
    <div className="ms-4">
      <h4 className="fw-bold mb-2">{title}</h4>
      <p className="text-white-50 lead fs-6">{desc}</p>
    </div>
  </div>
);

const DonorFunnel = () => {
  const { t } = useTranslation();

  useSeo(
    t('donorFunnel.hero.title', 'AI Donor Funnel - SmallPush'),
    t('donorFunnel.narrative.text', 'Transforming interactions into impact through AI.'),
    {
      image: '/logo.png',
      url: window.location.href,
      keywords: 'donor funnel, AI, CiviCRM, Symfony, LangChain, automation'
    }
  );

  return (
    <div className="donor-funnel-page py-5">
      <Container className="mt-5">
        {/* Hero Section */}
        <section className="hero-section text-center mb-5 py-5 position-relative overflow-hidden">
          <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 bg-primary opacity-10 blur-3xl z-n1" style={{ filter: 'blur(100px)' }}></div>
          <h1 className="display-3 fw-bold mb-3 tracking-tight">
            {t('donorFunnel.hero.title')}
          </h1>
          <p className="lead text-primary fw-bold text-uppercase tracking-widest mb-0">
            {t('donorFunnel.hero.subtitle')}
          </p>
        </section>

        {/* Narrative Section */}
        <Row className="justify-content-center mb-5 pb-5">
          <Col lg={10}>
            <GlassContainer className="p-5 text-center">
              <h2 className="display-5 fw-bold mb-4">{t('donorFunnel.narrative.title')}</h2>
              <p className="fs-4 text-white-75 mb-0">
                {t('donorFunnel.narrative.text')}
              </p>
            </GlassContainer>
          </Col>
        </Row>

        {/* Tech Ecosystem Section */}
        <section className="mb-5 pb-5">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold">{t('donorFunnel.ecosystem.title')}</h2>
            <div className="h-1 w-25 bg-primary mx-auto opacity-50 my-4" style={{ height: '2px' }}></div>
          </div>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <EcosystemCard
                icon="fa-hashtag"
                title={t('donorFunnel.ecosystem.meta.title')}
                role={t('donorFunnel.ecosystem.meta.role')}
                desc={t('donorFunnel.ecosystem.meta.desc')}
              />
            </Col>
            <Col md={6} lg={3}>
              <EcosystemCard
                icon="fa-bolt"
                title={t('donorFunnel.ecosystem.fastapi.title')}
                role={t('donorFunnel.ecosystem.fastapi.role')}
                desc={t('donorFunnel.ecosystem.fastapi.desc')}
              />
            </Col>
            <Col md={6} lg={3}>
              <EcosystemCard
                icon="fa-brain"
                title={t('donorFunnel.ecosystem.langchain.title')}
                role={t('donorFunnel.ecosystem.langchain.role')}
                desc={t('donorFunnel.ecosystem.langchain.desc')}
              />
            </Col>
            <Col md={6} lg={3}>
              <EcosystemCard
                icon="fa-database"
                title={t('donorFunnel.ecosystem.symfony.title')}
                role={t('donorFunnel.ecosystem.symfony.role')}
                desc={t('donorFunnel.ecosystem.symfony.desc')}
              />
            </Col>
          </Row>
        </section>

        {/* Donor Journey Section */}
        <Row className="justify-content-center mb-5 pb-5">
          <Col lg={8}>
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold">{t('donorFunnel.journey.title')}</h2>
              <div className="h-1 w-25 bg-primary mx-auto opacity-50 my-4" style={{ height: '2px' }}></div>
            </div>
            <GlassContainer className="p-5">
              <TimelineItem
                phase="1"
                title={t('donorFunnel.journey.phase1.title')}
                desc={t('donorFunnel.journey.phase1.desc')}
              />
              <TimelineItem
                phase="2"
                title={t('donorFunnel.journey.phase2.title')}
                desc={t('donorFunnel.journey.phase2.desc')}
              />
              <TimelineItem
                phase="3"
                title={t('donorFunnel.journey.phase3.title')}
                desc={t('donorFunnel.journey.phase3.desc')}
              />
              <TimelineItem
                phase="4"
                title={t('donorFunnel.journey.phase4.title')}
                desc={t('donorFunnel.journey.phase4.desc')}
                isLast
              />
            </GlassContainer>
          </Col>
        </Row>

        {/* CTA Section */}
        <section className="text-center py-5">
          <GlassContainer className="p-5 bg-primary bg-opacity-10 border-primary border-opacity-25 shadow-primary-lg">
            <h2 className="display-5 fw-bold mb-4">{t('donorFunnel.cta.title')}</h2>
            <Button
              as={HashLink}
              smooth
              to="/#contact"
              variant="primary"
              size="lg"
              className="rounded-pill px-5 py-3 fw-bold transition-all hover-scale shadow-lg"
            >
              {t('donorFunnel.cta.button')}
            </Button>
          </GlassContainer>
        </section>
      </Container>
    </div>
  );
};

export default DonorFunnel;
