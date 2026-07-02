import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';
import GlassContainer from '../components/GlassContainer';
import useSeo from '../utils/useSeo';

const ValueCard = ({ icon, title, text }) => (
  <Card className="h-100 border-0 shadow-sm rounded-4">
    <Card.Body className="p-4">
      <div className="mb-3 text-primary">
        <i className={`fa-solid ${icon} fa-2x`}></i>
      </div>
      <h3 className="h5 fw-bold mb-3">{title}</h3>
      <p className="mb-0 text-muted">{text}</p>
    </Card.Body>
  </Card>
);

const FunnelStep = ({ number, title, text }) => (
  <div className="d-flex gap-3 mb-4">
    <div className="flex-shrink-0">
      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: 42, height: 42 }}>
        {number}
      </div>
    </div>
    <div>
      <h3 className="h5 fw-bold mb-2">{title}</h3>
      <p className="text-muted mb-0">{text}</p>
    </div>
  </div>
);

const EventFunnel = () => {
  const { t } = useTranslation();

  useSeo(
    t('eventFunnel.seo.title', 'Event Registration Funnel for Nonprofits - SmallPush'),
    t('eventFunnel.seo.description', 'Landing, registrations, attendance tracking and payments for nonprofit events.'),
    {
      image: '/logo.png',
      url: window.location.href,
      keywords: 'event funnel, nonprofit events, registrations, attendance, payments, CiviCRM'
    }
  );

  return (
    <div className="event-funnel-page py-5">
      <Container className="mt-5">
        <section className="py-5">
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <Badge bg="primary" className="rounded-pill px-3 py-2 mb-4">
                {t('eventFunnel.hero.badge')}
              </Badge>
              <h1 className="display-3 fw-bold tracking-tight mb-4">
                {t('eventFunnel.hero.title')}
              </h1>
              <p className="hero-subtitle mb-4">
                {t('eventFunnel.hero.subtitle')}
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button
                  as={HashLink}
                  smooth
                  to="/#contact"
                  variant="primary"
                  size="lg"
                  className="rounded-pill px-4 fw-bold"
                >
                  {t('eventFunnel.hero.primaryCta')}
                </Button>
                <Button
                  as={HashLink}
                  smooth
                  to="/event-funnel#journey"
                  variant="outline-primary"
                  size="lg"
                  className="rounded-pill px-4 fw-bold"
                >
                  {t('eventFunnel.hero.secondaryCta')}
                </Button>
              </div>
            </Col>
            <Col lg={5}>
              <GlassContainer className="p-4 p-lg-5">
                <div className="small fw-bold text-primary text-uppercase mb-3">
                  {t('eventFunnel.snapshot.label')}
                </div>
                <div className="d-grid gap-3">
                  <div className="d-flex justify-content-between border-bottom pb-3">
                    <span>{t('eventFunnel.snapshot.registrations')}</span>
                    <strong>{t('eventFunnel.snapshot.registrationsValue')}</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-3">
                    <span>{t('eventFunnel.snapshot.payments')}</span>
                    <strong>{t('eventFunnel.snapshot.paymentsValue')}</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-3">
                    <span>{t('eventFunnel.snapshot.attendance')}</span>
                    <strong>{t('eventFunnel.snapshot.attendanceValue')}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>{t('eventFunnel.snapshot.followup')}</span>
                    <strong>{t('eventFunnel.snapshot.followupValue')}</strong>
                  </div>
                </div>
              </GlassContainer>
            </Col>
          </Row>
        </section>

        <section className="py-5">
          <Row className="g-4">
            <Col md={4}>
              <ValueCard
                icon="fa-ticket"
                title={t('eventFunnel.value.registration.title')}
                text={t('eventFunnel.value.registration.text')}
              />
            </Col>
            <Col md={4}>
              <ValueCard
                icon="fa-credit-card"
                title={t('eventFunnel.value.payments.title')}
                text={t('eventFunnel.value.payments.text')}
              />
            </Col>
            <Col md={4}>
              <ValueCard
                icon="fa-clipboard-check"
                title={t('eventFunnel.value.attendance.title')}
                text={t('eventFunnel.value.attendance.text')}
              />
            </Col>
          </Row>
        </section>

        <section id="journey" className="py-5">
          <Row className="justify-content-center mb-4">
            <Col lg={8} className="text-center">
              <h2 className="display-6 fw-bold mb-3">{t('eventFunnel.journey.title')}</h2>
              <p className="lead text-muted">{t('eventFunnel.journey.subtitle')}</p>
            </Col>
          </Row>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <GlassContainer className="p-4 p-lg-5">
                <FunnelStep number="1" title={t('eventFunnel.journey.step1.title')} text={t('eventFunnel.journey.step1.text')} />
                <FunnelStep number="2" title={t('eventFunnel.journey.step2.title')} text={t('eventFunnel.journey.step2.text')} />
                <FunnelStep number="3" title={t('eventFunnel.journey.step3.title')} text={t('eventFunnel.journey.step3.text')} />
                <FunnelStep number="4" title={t('eventFunnel.journey.step4.title')} text={t('eventFunnel.journey.step4.text')} />
              </GlassContainer>
            </Col>
            <Col lg={6}>
              <h3 className="fw-bold mb-4">{t('eventFunnel.deliverables.title')}</h3>
              <ul className="list-unstyled d-grid gap-3">
                <li><i className="fa-solid fa-check text-primary me-2"></i>{t('eventFunnel.deliverables.item1')}</li>
                <li><i className="fa-solid fa-check text-primary me-2"></i>{t('eventFunnel.deliverables.item2')}</li>
                <li><i className="fa-solid fa-check text-primary me-2"></i>{t('eventFunnel.deliverables.item3')}</li>
                <li><i className="fa-solid fa-check text-primary me-2"></i>{t('eventFunnel.deliverables.item4')}</li>
                <li><i className="fa-solid fa-check text-primary me-2"></i>{t('eventFunnel.deliverables.item5')}</li>
              </ul>
            </Col>
          </Row>
        </section>

        <section className="py-5 text-center">
          <GlassContainer className="p-4 p-lg-5 bg-primary bg-opacity-10 border-primary border-opacity-25">
            <h2 className="display-6 fw-bold mb-3">{t('eventFunnel.cta.title')}</h2>
            <p className="lead text-muted mb-4">{t('eventFunnel.cta.text')}</p>
            <Button
              as={HashLink}
              smooth
              to="/#contact"
              variant="primary"
              size="lg"
              className="rounded-pill px-5 fw-bold"
            >
              {t('eventFunnel.cta.button')}
            </Button>
          </GlassContainer>
        </section>
      </Container>
    </div>
  );
};

export default EventFunnel;
