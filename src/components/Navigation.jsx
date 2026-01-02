import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="/logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top me-2 rounded"
            alt="SmallPush Logo"
            style={{ objectFit: 'contain', backgroundColor: '#33394b' }}
          />
          SmallPush
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home">{t('navigation.home')}</Nav.Link>
            <Nav.Link href="#about">{t('navigation.about')}</Nav.Link>
            <Nav.Link href="#services">{t('navigation.services')}</Nav.Link>
            <Nav.Link href="#contact">{t('navigation.contact')}</Nav.Link>
            <LanguageSelector />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
