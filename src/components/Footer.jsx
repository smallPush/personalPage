import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 text-center">
      <Container>
        <p className="mb-0">&copy; {new Date().getFullYear()} SmallPush. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
