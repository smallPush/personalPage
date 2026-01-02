import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const QuoteCalculator = () => {
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
                <h3 className="text-center mb-4">Request a Quote</h3>
                <Form onSubmit={calculateCost}>
                  <Form.Group className="mb-3" controlId="formProjectType">
                    <Form.Label>Project Type</Form.Label>
                    <Form.Select 
                      value={projectType} 
                      onChange={(e) => setProjectType(e.target.value)}
                    >
                      <option value="civi">CiviCRM Development</option>
                      <option value="drupal">Drupal Development</option>
                      <option value="payment">Payment Integration</option>
                      <option value="fiscal">Fiscal Models</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formHours">
                    <Form.Label>Estimated Hours Needed</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={hours} 
                      onChange={(e) => setHours(e.target.value)} 
                      min="1"
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Estimate Cost
                    </Button>
                  </div>
                </Form>

                {estimatedCost !== null && (
                  <div className="mt-4 text-center">
                    <h4>Estimated Cost: €{estimatedCost}</h4>
                    <p className="text-muted small">*This is a rough estimate. Contact us for a detailed quote.</p>
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
