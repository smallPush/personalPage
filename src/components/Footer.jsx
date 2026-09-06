import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-5 text-center mt-5">
      <Container>
        <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4 mb-4 small">
          <Link to="/donor-funnel" className="text-muted text-decoration-none hover-text-primary">
            {t('footer.donorFunnel', 'Donor Funnel')}
          </Link>
          <Link to="/event-funnel" className="text-muted text-decoration-none hover-text-primary">
            {t('footer.eventFunnel', 'Event Funnel')}
          </Link>
          <Link to="/fundaciones-barcelona" className="text-muted text-decoration-none hover-text-primary">
            {t('footer.bcnFunnel', 'Fundaciones Barcelona')}
          </Link>
          <Link to="/news" className="text-muted text-decoration-none hover-text-primary">
            {t('navigation.notices', 'Noticias')}
          </Link>
          <a href="mailto:info@smallpush.org" className="text-muted text-decoration-none hover-text-primary">
            info@smallpush.org
          </a>
        </div>
        <div className="mb-3 border-top border-secondary-subtle mx-auto" style={{ maxWidth: '240px' }}></div>
        <p className="small mb-0 text-muted">&copy; {new Date().getFullYear()} SMALLPUSH. {t('footer.rights')}</p>
      </Container>
    </footer>
  );
};

export default Footer;
