import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';

const QuoteCalculator = () => {
  const { t } = useTranslation();
  const [projectType, setProjectType] = useState('civi');
  const [hours, setHours] = useState(10);
  const [estimatedCost, setEstimatedCost] = useState(null);

  const calculateCost = (e) => {
    e.preventDefault();
    let rate = 50;
    if (projectType === 'drupal') rate = 60;
    if (projectType === 'payment') rate = 70;
    if (projectType === 'ads') rate = 65;
    if (projectType === 'ai') rate = 80;

    setEstimatedCost(hours * rate);
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <GlassContainer className="p-4 p-md-5">
          <h3 className="text-center mb-4">{t('quote.title')}</h3>
          <Form onSubmit={calculateCost}>
            <Form.Group className="mb-4" controlId="formProjectType">
              <Form.Label className="small fw-bold opacity-75">{t('quote.projectType.label')}</Form.Label>
              <Form.Select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="bg-dark text-white border-secondary"
              >
                <option value="civi">{t('quote.projectType.civi')}</option>
                <option value="drupal">{t('quote.projectType.drupal')}</option>
                <option value="payment">{t('quote.projectType.payment')}</option>
                <option value="fiscal">{t('quote.projectType.fiscal')}</option>
                <option value="ads">{t('quote.projectType.ads')}</option>
                <option value="ai">{t('quote.projectType.ai')}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formHours">
              <Form.Label className="small fw-bold opacity-75">{t('quote.hours.label')}</Form.Label>
              <Form.Control
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="1"
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" className="py-3 fw-bold">
                {t('quote.submit')}
              </Button>
            </div>
          </Form>

          {estimatedCost !== null && (
            <div className="mt-5 text-center p-4 rounded-4 bg-white bg-opacity-10 border border-white border-opacity-10">
              <h4 className="mb-1">{t('quote.result.title')} €{estimatedCost}</h4>
              <p className="text-muted small mb-0">{t('quote.result.disclaimer')}</p>
            </div>
          )}
        </GlassContainer>
      </Col>
    </Row>
  );
};

export default QuoteCalculator;
