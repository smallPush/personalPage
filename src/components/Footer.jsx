import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-5 text-center mt-5" style={{ opacity: 0.6 }}>
      <Container>
        <div className="mb-3 border-top border-secondary opacity-25 mx-auto" style={{ maxWidth: '200px' }}></div>
        <p className="small mb-0 tracking-widest">&copy; {new Date().getFullYear()} SMALLPUSH. {t('footer.rights')}</p>
      </Container>
    </footer>
  );
};

export default Footer;
