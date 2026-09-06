import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
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

const CiviCrmFunnel = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  
  // Extraer parámetros cid y cs si provienen de un mailing de CiviCRM
  const cid = searchParams.get('cid') || '';
  const cs = searchParams.get('cs') || '';

  const [formData, setFormData] = useState({
    foundationName: '',
    contactName: '',
    email: '',
    phone: '',
    problem: '',
    cid: cid,
    cs: cs
  });

  const [status, setStatus] = useState({ submitting: false, success: false, error: false });

  useSeo(
    t('civiFunnelBcn.seo.title', 'Integración CiviCRM para Fundaciones en Barcelona - SmallPush'),
    t('civiFunnelBcn.seo.description', 'Centraliza la gestión de socios, donativos y modelos fiscales de tu fundación con CiviCRM.'),
    {
      image: '/logo.png',
      url: window.location.href,
      keywords: 'CiviCRM, fundaciones, Barcelona, tercer sector, CRM, modelo 182, donativos'
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });
    
    try {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        const text = `🏛️ *Nueva Solicitud: Fundaciones Barcelona*\n\n*Fundación:* ${formData.foundationName}\n*Contacto:* ${formData.contactName}\n*Email:* ${formData.email}\n*Teléfono:* ${formData.phone}\n*Reto/Problema:*\n${formData.problem}${formData.cid ? `\n\n*CiviCRM CID:* ${formData.cid}` : ''}`;
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
          })
        });

        if (!response.ok) {
          throw new Error('Error al enviar el formulario a través del bot');
        }
      } else {
        // Simulación para entornos de desarrollo o tests
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      setStatus({ submitting: false, success: true, error: false });
      setFormData({ ...formData, foundationName: '', contactName: '', email: '', phone: '', problem: '' });
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: true });
    }
  };

  return (
    <div className="civicrm-funnel-page py-5">
      <Container className="mt-5">
        <section className="py-5">
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <Badge bg="primary" className="rounded-pill px-3 py-2 mb-4">
                {t('civiFunnelBcn.hero.badge')}
              </Badge>
              <h1 className="display-3 fw-bold tracking-tight mb-4">
                {t('civiFunnelBcn.hero.title')}
              </h1>
              <p className="hero-subtitle lead mb-4 text-muted">
                {t('civiFunnelBcn.hero.subtitle')}
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button
                  href="#contact-form"
                  variant="primary"
                  size="lg"
                  className="rounded-pill px-4 fw-bold"
                >
                  {t('civiFunnelBcn.hero.primaryCta')}
                </Button>
              </div>
            </Col>
            <Col lg={5}>
              <GlassContainer className="p-4 p-lg-5">
                <Row className="g-4">
                  <Col xs={12}>
                    <ValueCard
                      icon="fa-users"
                      title={t('civiFunnelBcn.value.socios.title')}
                      text={t('civiFunnelBcn.value.socios.text')}
                    />
                  </Col>
                  <Col xs={12}>
                    <ValueCard
                      icon="fa-euro-sign"
                      title={t('civiFunnelBcn.value.pagos.title')}
                      text={t('civiFunnelBcn.value.pagos.text')}
                    />
                  </Col>
                  <Col xs={12}>
                    <ValueCard
                      icon="fa-file-invoice"
                      title={t('civiFunnelBcn.value.fiscal.title')}
                      text={t('civiFunnelBcn.value.fiscal.text')}
                    />
                  </Col>
                </Row>
              </GlassContainer>
            </Col>
          </Row>
        </section>

        <section id="contact-form" className="py-5 text-center mt-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <GlassContainer className="p-4 p-lg-5 bg-primary bg-opacity-10 border-primary border-opacity-25 shadow-primary-lg">
                <h2 className="display-5 fw-bold mb-3">{t('civiFunnelBcn.form.title')}</h2>
                <p className="lead text-muted mb-5">{t('civiFunnelBcn.form.subtitle')}</p>
                
                {status.success && (
                  <Alert variant="success" className="mb-4">
                    <i className="fa-solid fa-check-circle me-2"></i>
                    {t('civiFunnelBcn.form.success')}
                  </Alert>
                )}
                
                {status.error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="fa-solid fa-triangle-exclamation me-2"></i>
                    {t('civiFunnelBcn.form.error')}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} className="text-start">
                  {/* Campos ocultos para mantener la traza de CiviCRM si vienen del mailing */}
                  <input type="hidden" name="cid" value={formData.cid} />
                  <input type="hidden" name="cs" value={formData.cs} />

                  <Row className="g-4 mb-4">
                    <Col md={6}>
                      <Form.Group controlId="foundationName">
                        <Form.Label className="fw-bold">{t('civiFunnelBcn.form.foundationName')}</Form.Label>
                        <Form.Control
                          type="text"
                          name="foundationName"
                          value={formData.foundationName}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 shadow-sm p-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="contactName">
                        <Form.Label className="fw-bold">{t('civiFunnelBcn.form.contactName', 'Persona de Contacto')}</Form.Label>
                        <Form.Control
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 shadow-sm p-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label className="fw-bold">{t('civiFunnelBcn.form.email', 'Correo Electrónico')}</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 shadow-sm p-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label className="fw-bold">{t('civiFunnelBcn.form.phone')}</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 shadow-sm p-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="problem">
                        <Form.Label className="fw-bold">{t('civiFunnelBcn.form.problem')}</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="problem"
                          value={formData.problem}
                          onChange={handleChange}
                          required
                          className="bg-white border-0 shadow-sm p-3"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status.submitting}
                      className="rounded-pill px-5 py-3 fw-bold transition-all hover-scale shadow-lg w-100 w-md-auto"
                    >
                      {status.submitting ? (
                        <span><i className="fa-solid fa-circle-notch fa-spin me-2"></i>Enviando...</span>
                      ) : (
                        t('civiFunnelBcn.form.submit')
                      )}
                    </Button>
                  </div>
                </Form>
              </GlassContainer>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default CiviCrmFunnel;
