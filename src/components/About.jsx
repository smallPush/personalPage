import React from 'react';
import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <GlassContainer className="text-center p-5">
          <h2 className="text-fluid-lg mb-4">{t('about.title')}</h2>
          <p className="lead mx-auto" style={{ maxWidth: '800px', opacity: 0.9 }}>
            {t('about.text')}
          </p>
        </GlassContainer>
      </div>
    </div>
  );
};

export default About;
