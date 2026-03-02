import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';
import { HashLink } from 'react-router-hash-link';

const QuoteCalculator = () => {
  const { t } = useTranslation();
  const [projectType, setProjectType] = useState('civi');
  const [hours, setHours] = useState(25);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const projectTypes = [
    { id: 'civi', icon: '💻', rate: 50 },
    { id: 'drupal', icon: '🌐', rate: 60 },
    { id: 'payment', icon: '💳', rate: 70 },
    { id: 'fiscal', icon: '📊', rate: 60 },
    { id: 'ads', icon: '📈', rate: 65 },
    { id: 'ai', icon: '🤖', rate: 80 }
  ];

  useEffect(() => {
    const selectedProject = projectTypes.find(p => p.id === projectType);
    const rate = selectedProject ? selectedProject.rate : 50;
    setEstimatedCost(hours * rate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectType, hours]);

  return (
    <Row className="justify-content-center">
      <Col md={10} lg={8} xl={7}>
        <GlassContainer className="p-4 p-md-5 overflow-hidden position-relative">
          {/* Decorative background glow */}
          <div className="position-absolute top-0 start-50 translate-middle-x w-100 h-100 bg-primary opacity-10 blur-3xl z-n1 rounded-circle" style={{ filter: 'blur(100px)' }}></div>

          <div className="text-center mb-5">
            <h3 className="display-6 fw-bold mb-3">{t('quote.title')}</h3>
            <p className="lead text-muted">{t('quote.subtitle', 'Build your custom project estimate in seconds.')}</p>
          </div>

          <div className="mb-5">
            <h5 className="mb-3 text-white-50 small fw-bold text-uppercase tracking-wider">{t('quote.projectType.label')}</h5>
            <Row className="g-3">
              {projectTypes.map(pt => (
                <Col xs={6} md={4} key={pt.id}>
                  <div
                    onClick={() => setProjectType(pt.id)}
                    className={`h-100 p-3 rounded-4 cursor-pointer transition-all ${projectType === pt.id
                      ? 'bg-primary bg-opacity-25 border border-primary shadow-lg scale-105'
                      : 'bg-dark bg-opacity-50 border border-white border-opacity-10 hover-bg-light hover-border-opacity-25'
                      }`}
                    style={{ transition: 'all 0.3s ease', cursor: 'pointer', transform: projectType === pt.id ? 'scale(1.02)' : 'scale(1)' }}
                  >
                    <div className="text-center">
                      <div className="display-4 mb-2">{pt.icon}</div>
                      <div className={`fw-medium ${projectType === pt.id ? 'text-white' : 'text-white-50'}`}>
                        {t(`quote.projectType.${pt.id}`)}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-white-50 small fw-bold text-uppercase tracking-wider mb-0">{t('quote.hours.label')}</h5>
              <Badge bg="primary" className="fs-6 px-3 py-2 rounded-pill">
                {hours} {t('quote.hours.unit', 'hrs')}
              </Badge>
            </div>
            <div className="px-2">
              <input
                type="range"
                className="form-range custom-range"
                min="5"
                max="200"
                step="5"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                style={{ height: '8px' }}
              />
              <div className="d-flex justify-content-between text-muted small mt-2 px-1">
                <span>5h</span>
                <span>200h+</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-10 text-start shadow-sm transition-all">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2 fs-5">💡</span>
                <span className="text-white-50 small fw-bold text-uppercase tracking-wider">
                  {t('quote.exampleTitle', 'Estimated Scope Example')}
                </span>
              </div>
              <p className="text-white mb-0 small opacity-75 lh-base">
                {t(`quote.examples.${projectType}.${hours <= 15 ? 'small' : hours <= 40 ? 'medium' : 'large'}`)}
              </p>
            </div>
          </div>

          <div className="mt-5 p-4 p-md-5 rounded-4 bg-gradient-to-r from-primary-dark to-dark border border-primary border-opacity-25 position-relative overflow-hidden">
            <div className="position-absolute top-0 end-0 p-3 opacity-10">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
            </div>

            <div className="text-center position-relative z-1">
              <p className="text-uppercase text-primary tracking-widest small fw-bold mb-2">{t('quote.result.title')}</p>
              <div className="display-3 fw-bold mb-2 text-white text-shadow-sm">
                €{estimatedCost.toLocaleString()}
              </div>
              <p className="text-white-50 small mb-4">{t('quote.result.disclaimer')}</p>

              <Button
                as={HashLink}
                to="#contact"
                smooth
                variant="primary"
                size="lg"
                className="w-100 py-3 rounded-pill fw-bold shadow-lg mt-2 transition-transform hover-scale-105"
                style={{ transition: 'transform 0.2s ease', maxWidth: '300px' }}
              >
                {t('quote.cta', 'Discuss This Project')}
              </Button>
            </div>
          </div>
        </GlassContainer>
      </Col>
    </Row>
  );
};

export default QuoteCalculator;
