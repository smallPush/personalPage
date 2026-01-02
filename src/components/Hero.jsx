import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className="hero-section text-white text-center py-5 mb-4" style={{ marginTop: '56px' }} id="home">
      <Container className="py-5">
        <div className="mb-4">
           <img src="/logo-alt.svg" alt="SmallPush Icon" width="120" height="120" />
        </div>
        <h1 className="display-4 fw-bold">SmallPush</h1>
        <p className="lead mb-4">
          Expert CiviCRM & Drupal Solutions for Non-Profits and Enterprises.
        </p>
        <Button variant="primary" size="lg" href="#contact">Get Started</Button>
      </Container>
    </div>
  );
};

export default Hero;
