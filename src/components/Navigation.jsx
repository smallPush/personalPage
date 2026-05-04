import { useState, useMemo } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import LanguageSelector from './LanguageSelector';
import { NAV_LINKS } from '../config/navigation';

const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const linkHandlers = useMemo(() => {
    return NAV_LINKS.map((link) => () => {
      setExpanded(false);
      if (link.scrollToTop) {
        window.scrollTo(0, 0);
      }
    });
  }, []);

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
            {NAV_LINKS.map((link, index) => {
              const isActive = link.isActive(location);
              const className = `px-3 py-2 rounded-3 transition-all ${isActive ? 'text-primary fw-bold' : ''}`;

              const label = link.fallback
                ? t(link.labelKey, link.fallback)
                : t(link.labelKey);

              if (link.type === 'link') {
                return (
                  <LinkContainer key={link.to} to={link.to}>
                    <Nav.Link className={className} onClick={linkHandlers[index]}>
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
                  onClick={linkHandlers[index]}
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
