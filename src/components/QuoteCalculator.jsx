import React, { useState, useCallback } from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';
import { HashLink } from 'react-router-hash-link';

const projectTypes = [
  { id: 'civi', icon: '💻', rate: 50 },
  { id: 'drupal', icon: '🌐', rate: 60 },
  { id: 'payment', icon: '💳', rate: 70 },
  { id: 'fiscal', icon: '📊', rate: 60 },
  { id: 'ads', icon: '📈', rate: 65 },
  { id: 'ai', icon: '🤖', rate: 80 }
];

const projectRates = Object.fromEntries(projectTypes.map(p => [p.id, p.rate]));

const QuoteCalculator = () => {
  const { t } = useTranslation();
  const [projectType, setProjectType] = useState('civi');
  const [hours, setHours] = useState(25);

  const handleProjectTypeClick = useCallback((e) => {
    setProjectType(e.currentTarget.dataset.id);
  }, []);

  const estimatedCost = hours * (projectRates[projectType] || 50);

  return (
    <Row className="justify-content-center">
      <Col md={10} lg={8} xl={7}>
        <GlassContainer className="p-4 p-md-5 overflow-hidden position-relative">
          <div
            className="position-absolute top-0 start-50 translate-middle-x w-100 h-100 bg-primary opacity-10 z-n1 rounded-circle"
            style={{ filter: 'blur(130px)', opacity: 0.06 }}
          ></div>

          <div className="text-center mb-5 rounded-4 px-3 py-3" style={{ background: 'rgba(255, 255, 255, 0.78)' }}>
            <h3 className="display-6 fw-bold mb-3">{t('quote.title')}</h3>
            <p className="lead mb-0" style={{ color: '#334155' }}>{t('quote.subtitle', 'Build your custom project estimate in seconds.')}</p>
          </div>

          <div className="mb-5">
            <h5 className="mb-3 text-muted small fw-bold text-uppercase">{t('quote.projectType.label')}</h5>
            <Row className="g-3">
              {projectTypes.map(pt => (
                <Col xs={6} md={4} key={pt.id}>
                  <div
                    data-id={pt.id}
                    onClick={handleProjectTypeClick}
                    className={`h-100 p-3 rounded-4 cursor-pointer transition-all ${projectType === pt.id
                      ? 'bg-primary bg-opacity-10 border border-primary shadow-sm'
                      : 'bg-white border border-secondary-subtle'
                      }`}
                    style={{ transition: 'all 0.3s ease', cursor: 'pointer', transform: projectType === pt.id ? 'scale(1.02)' : 'scale(1)' }}
                  >
                    <div className="text-center">
                      <div className="display-4 mb-2">{pt.icon}</div>
                      <div className={`fw-medium ${projectType === pt.id ? 'text-primary' : 'text-secondary'}`}>
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
              <h5 className="text-muted small fw-bold text-uppercase mb-0">{t('quote.hours.label')}</h5>
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

            <div className="mt-4 p-3 rounded-3 bg-white border border-secondary-subtle text-start shadow-sm transition-all">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2 fs-5">💡</span>
                <span className="text-muted small fw-bold text-uppercase">
                  {t('quote.exampleTitle', 'Estimated Scope Example')}
                </span>
              </div>
              <p className="mb-0 small text-secondary lh-base">
                {t(`quote.examples.${projectType}.${hours <= 15 ? 'small' : hours <= 40 ? 'medium' : 'large'}`)}
              </p>
            </div>
          </div>

          <div className="mt-5 p-4 p-md-5 rounded-4 bg-primary bg-opacity-10 border border-primary border-opacity-25 position-relative overflow-hidden">
            <div className="text-center position-relative z-1">
              <p className="text-uppercase text-primary small fw-bold mb-2">{t('quote.result.title')}</p>
              <div className="display-3 fw-bold mb-2 text-dark">
                €{estimatedCost.toLocaleString()}
              </div>
              <p className="text-muted small mb-4">{t('quote.result.disclaimer')}</p>

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
