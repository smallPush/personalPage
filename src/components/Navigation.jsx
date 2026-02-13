import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import LanguageSelector from './LanguageSelector';

const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={(toggle) => setExpanded(toggle)}
      className="glass-effect m-3 rounded-4 shadow-sm"
      style={{
        width: 'calc(100% - 2rem)',
        left: '1rem',
        top: '1rem'
      }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => {
            setExpanded(false);
            window.scrollTo(0, 0);
          }}>
            <img
              src="logo.png"
              width="36"
              height="36"
              className="d-inline-block align-top me-2 rounded-circle shadow-sm"
              alt="SmallPush Logo"
              style={{ objectFit: 'contain' }}
            />
            <span className="fw-bold tracking-tight">SmallPush</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2" onSelect={() => setExpanded(false)}>
            <LinkContainer to="/">
              <Nav.Link
                className={`px-3 py-2 rounded-3 transition-all ${location.pathname === '/' ? 'text-primary fw-bold' : ''}`}
                onClick={() => {
                  setExpanded(false);
                  window.scrollTo(0, 0);
                }}
              >
                {t('navigation.home')}
              </Nav.Link>
            </LinkContainer>

            <Nav.Link
              as={HashLink}
              smooth
              to="/#about"
              className={`px-3 py-2 rounded-3 transition-all ${location.hash === '#about' ? 'text-primary fw-bold' : ''}`}
              onClick={() => setExpanded(false)}
            >
              {t('navigation.about')}
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              smooth
              to="/#services"
              className={`px-3 py-2 rounded-3 transition-all ${location.hash === '#services' ? 'text-primary fw-bold' : ''}`}
              onClick={() => setExpanded(false)}
            >
              {t('navigation.services')}
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              smooth
              to="/#quote"
              className={`px-3 py-2 rounded-3 transition-all ${location.hash === '#quote' ? 'text-primary fw-bold' : ''}`}
              onClick={() => setExpanded(false)}
            >
              {t('navigation.quote')}
            </Nav.Link>

            <LinkContainer to="/news">
              <Nav.Link
                className={`px-3 py-2 rounded-3 transition-all ${location.pathname.startsWith('/news') ? 'text-primary fw-bold' : ''}`}
                onClick={() => setExpanded(false)}
              >
                {t('navigation.notices', 'News')}
              </Nav.Link>
            </LinkContainer>

            <Nav.Link
              as={HashLink}
              smooth
              to="/#contact"
              className={`px-3 py-2 rounded-3 transition-all ${location.hash === '#contact' ? 'text-primary fw-bold' : ''}`}
              onClick={() => setExpanded(false)}
            >
              {t('navigation.contact')}
            </Nav.Link>

            <div className="ms-lg-3 py-2 py-lg-0">
              <LanguageSelector />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
