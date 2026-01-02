import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Services = () => {
  const services = [
    {
      title: "CiviCRM Custom Development",
      text: "Tailored CiviCRM solutions to fit your organization's unique needs."
    },
    {
      title: "Drupal Development",
      text: "Robust and scalable Drupal websites and applications."
    },
    {
      title: "Spanish Payments Ecosystem",
      text: "Expert integration with Spanish payment gateways and banking systems."
    },
    {
      title: "Fiscal Models Management",
      text: "Solutions for managing fiscal data and generating tax reports (e.g., Model 182)."
    }
  ];

  return (
    <section id="services" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">Our Services</h2>
        <Row>
          {services.map((service, index) => (
            <Col md={6} lg={3} className="mb-4" key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>
                    {service.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
