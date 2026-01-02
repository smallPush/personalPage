import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-dark text-white py-4 text-center">
      <Container>
        <p className="mb-0">&copy; {new Date().getFullYear()} SmallPush. {t('footer.rights')}</p>
      </Container>
    </footer>
  );
};

export default Footer;
