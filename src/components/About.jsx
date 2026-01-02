import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <section id="about" className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <h2 className="text-center mb-4">About Us</h2>
            <p className="lead text-center">
              SmallPush is a new enterprise founded by an expert with over 14 years of experience in the software industry.
              We specialize in custom developments for CiviCRM and Drupal, helping organizations streamline their operations and manage their data effectively.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
