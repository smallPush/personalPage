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
      bg="light"
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={(toggle) => setExpanded(toggle)}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => {
            setExpanded(false);
            window.scrollTo(0, 0);
          }}>
            <img
              src="logo.png"
              width="40"
              height="40"
              className="d-inline-block align-top me-2 rounded"
              alt="SmallPush Logo"
              style={{ objectFit: 'contain', backgroundColor: '#33394b' }}
            />
            SmallPush
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center" onSelect={() => setExpanded(false)}>
            <LinkContainer to="/">
              <Nav.Link onClick={() => {
                setExpanded(false);
                window.scrollTo(0, 0);
              }}>{t('navigation.home')}</Nav.Link>
            </LinkContainer>

            <Nav.Link
              as={HashLink}
              smooth
              to="/#about"
              onClick={() => setExpanded(false)}
            >
              {t('navigation.about')}
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              smooth
              to="/#services"
              onClick={() => setExpanded(false)}
            >
              {t('navigation.services')}
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              smooth
              to="/#quote"
              onClick={() => setExpanded(false)}
            >
              {t('navigation.quote')}
            </Nav.Link>

            <LinkContainer to="/news">
              <Nav.Link onClick={() => setExpanded(false)}>{t('navigation.notices', 'News')}</Nav.Link>
            </LinkContainer>

            <Nav.Link
              as={HashLink}
              smooth
              to="/#contact"
              onClick={() => setExpanded(false)}
            >
              {t('navigation.contact')}
            </Nav.Link>

            <LanguageSelector />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
