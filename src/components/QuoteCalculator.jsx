import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const QuoteCalculator = () => {
  const { t } = useTranslation();
  const [projectType, setProjectType] = useState('civi');
  const [hours, setHours] = useState(10);
  const [estimatedCost, setEstimatedCost] = useState(null);

  const calculateCost = (e) => {
    e.preventDefault();
    let rate = 50; // Base rate
    if (projectType === 'drupal') rate = 60;
    if (projectType === 'payment') rate = 70;

    setEstimatedCost(hours * rate);
  };

  return (
    <section id="contact" className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow">
              <Card.Body>
                <h3 className="text-center mb-4">{t('quote.title')}</h3>
                <Form onSubmit={calculateCost}>
                  <Form.Group className="mb-3" controlId="formProjectType">
                    <Form.Label>{t('quote.projectType.label')}</Form.Label>
                    <Form.Select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                    >
                      <option value="civi">{t('quote.projectType.civi')}</option>
                      <option value="drupal">{t('quote.projectType.drupal')}</option>
                      <option value="payment">{t('quote.projectType.payment')}</option>
                      <option value="fiscal">{t('quote.projectType.fiscal')}</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formHours">
                    <Form.Label>{t('quote.hours.label')}</Form.Label>
                    <Form.Control
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      min="1"
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      {t('quote.submit')}
                    </Button>
                  </div>
                </Form>

                {estimatedCost !== null && (
                  <div className="mt-4 text-center">
                    <h4>{t('quote.result.title')} €{estimatedCost}</h4>
                    <p className="text-muted small">{t('quote.result.disclaimer')}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QuoteCalculator;
