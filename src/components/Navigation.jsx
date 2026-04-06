import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import LanguageSelector from './LanguageSelector';

const NAV_LINKS = [
  {
    type: 'link',
    to: '/',
    labelKey: 'navigation.home',
    isActive: (location) => location.pathname === '/',
    scrollToTop: true,
  },
  {
    type: 'hash',
    to: '/#about',
    labelKey: 'navigation.about',
    isActive: (location) => location.hash === '#about',
  },
  {
    type: 'hash',
    to: '/#services',
    labelKey: 'navigation.services',
    isActive: (location) => location.hash === '#services',
  },
  {
    type: 'hash',
    to: '/#quote',
    labelKey: 'navigation.quote',
    isActive: (location) => location.hash === '#quote',
  },
  {
    type: 'link',
    to: '/donor-funnel',
    labelKey: 'navigation.donorFunnel',
    fallback: 'Donor Funnel',
    isActive: (location) => location.pathname === '/donor-funnel',
  },
  {
    type: 'link',
    to: '/news',
    labelKey: 'navigation.notices',
    fallback: 'News',
    isActive: (location) => location.pathname.startsWith('/news'),
  },
  {
    type: 'hash',
    to: '/#contact',
    labelKey: 'navigation.contact',
    isActive: (location) => location.hash === '#contact',
  },
];

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
            {NAV_LINKS.map((link) => {
              const isActive = link.isActive(location);
              const className = `px-3 py-2 rounded-3 transition-all ${isActive ? 'text-primary fw-bold' : ''}`;

              const handleClick = () => {
                setExpanded(false);
                if (link.scrollToTop) {
                  window.scrollTo(0, 0);
                }
              };

              const label = link.fallback
                ? t(link.labelKey, link.fallback)
                : t(link.labelKey);

              if (link.type === 'link') {
                return (
                  <LinkContainer key={link.to} to={link.to}>
                    <Nav.Link className={className} onClick={handleClick}>
                      {label}
                    </Nav.Link>
                  </LinkContainer>
                );
              }

              return (
                <Nav.Link
                  key={link.to}
                  as={HashLink}
                  smooth
                  to={link.to}
                  className={className}
                  onClick={handleClick}
                >
                  {label}
                </Nav.Link>
              );
            })}

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
