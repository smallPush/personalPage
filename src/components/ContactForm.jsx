import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';
import useCaptcha from '../hooks/useCaptcha';
import useContactSubmit from '../hooks/useContactSubmit';
import useScrollReveal from '../hooks/useScrollReveal';

const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        captchaInput: ''
    });
    const [captchaVisible, setCaptchaVisible] = useState(false);

    const { captcha, captchaVerified, setCaptchaVerified, generateCaptcha } = useCaptcha();
    const { status, setStatus, isSubmitting, submitContactForm } = useContactSubmit();

    React.useEffect(() => {
        const handlePrefill = (event) => {
            if (event?.detail?.message) {
                setFormData(prev => ({
                    ...prev,
                    message: event.detail.message
                }));
            }
        };
        window.addEventListener('prefill-contact', handlePrefill);
        return () => window.removeEventListener('prefill-contact', handlePrefill);
    }, []);

    const handleGenerateCaptcha = React.useCallback(() => {
        generateCaptcha();
        setFormData(prev => ({ ...prev, captchaInput: '' }));
    }, [generateCaptcha]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaClick = (e) => {
        const index = parseInt(e.currentTarget.dataset.index, 10);
        if (index === captcha.correctIndex) {
            setCaptchaVerified(true);
            setStatus({ type: '', msg: '' });
        } else {
            setStatus({ type: 'danger', msg: t('contact.captcha.error') });
            handleGenerateCaptcha();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaVisible) {
            handleGenerateCaptcha();
            setCaptchaVisible(true);
            setStatus({ type: '', msg: '' });
            return;
        }

        await submitContactForm(formData, captchaVerified, () => {
            setFormData({ name: '', email: '', message: '', captchaInput: '' });
            setCaptchaVisible(false);
            handleGenerateCaptcha();
        });
    };

    const sectionRef = useScrollReveal();

    return (
        <Row className="justify-content-center reveal-hidden" ref={sectionRef}>
            <Col md={10} lg={8}>
                <GlassContainer className="p-4 p-md-5">
                    <h2 className="text-fluid-lg text-center mb-4">{t('contact.title')}</h2>

                    <div className="p-3 mb-4 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-25 text-center">
                        <span className="badge bg-primary text-white rounded-pill px-3 py-1 mb-2 fw-semibold">
                            {t('contact.auditBadge', 'Diagnóstico Gratuito de 30 min')}
                        </span>
                        <h3 className="h6 fw-bold mb-1">
                            {t('contact.auditTitle', '¿Quieres revisar la captación o el CRM de tu organización?')}
                        </h3>
                        <p className="small text-muted mb-0">
                            {t('contact.auditDesc', 'Ofrecemos una sesión técnica gratuita de 30 minutos para fundaciones y ONGs. Analizamos tu caso sin compromiso.')}
                        </p>
                    </div>

                    {status.msg && (
                        <Alert
                            variant={status.type}
                            dismissible
                            onClose={() => setStatus({ type: '', msg: '' })}
                            className="glass-effect border-0 mb-4"
                            style={{ background: status.type === 'success' ? 'rgba(25, 135, 84, 0.2)' : 'rgba(220, 53, 69, 0.2)' }}
                        >
                            {status.msg}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold">{t('contact.name')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="py-3"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold">{t('contact.email')}</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="py-3"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold">{t('contact.message')}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className=""
                            />
                        </Form.Group>

                        {captchaVisible && (
                            <Form.Group className="mb-5">
                                <Form.Label className="small fw-bold opacity-75 mb-3">
                                    {t('contact.captcha.question')}
                                </Form.Label>
                                <div className="d-flex flex-wrap gap-2">
                                    {captcha.options.map((emoji, index) => (
                                        <Button
                                            key={index}
                                            data-index={index}
                                            variant={captchaVerified && index === captcha.correctIndex ? 'success' : 'outline-primary'}
                                            onClick={handleCaptchaClick}
                                            className={`flex-grow-1 p-3 fs-3 transition-smooth ${captchaVerified && index !== captcha.correctIndex ? 'opacity-25' : ''}`}
                                            disabled={captchaVerified && index !== captcha.correctIndex}
                                            type="button"
                                            style={{ borderRadius: '15px' }}
                                        >
                                            {emoji}
                                        </Button>
                                    ))}
                                </div>
                            </Form.Group>
                        )}

                        <div className="d-grid">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                                className="py-3 fs-5 fw-bold shadow-lg"
                            >
                                {isSubmitting ? '...' : t('contact.submit')}
                            </Button>
                        </div>
                    </Form>
                </GlassContainer>
            </Col>
        </Row>
    );
};

export default ContactForm;
