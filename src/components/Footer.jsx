import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-5 text-center mt-5">
      <Container>
        <div className="mb-3 border-top border-secondary-subtle mx-auto" style={{ maxWidth: '240px' }}></div>
        <p className="small mb-0 text-muted">&copy; {new Date().getFullYear()} SMALLPUSH. {t('footer.rights')}</p>
      </Container>
    </footer>
  );
};

export default Footer;
