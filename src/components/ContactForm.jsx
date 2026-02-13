import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlassContainer from './GlassContainer';

const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        captchaInput: ''
    });

    const [captcha, setCaptcha] = useState({ options: [], correctIndex: -1 });
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate new captcha on mount
    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const emojis = ['🚀', '🌟', '🌙', '⚡', '🔥', '💎', '🎈', '🍕', '🐱', '🌵', '🌺', '🎸'];
        const mainEmojiIndex = Math.floor(Math.random() * emojis.length);
        let diffEmojiIndex = Math.floor(Math.random() * emojis.length);

        while (diffEmojiIndex === mainEmojiIndex) {
            diffEmojiIndex = Math.floor(Math.random() * emojis.length);
        }

        const mainEmoji = emojis[mainEmojiIndex];
        const diffEmoji = emojis[diffEmojiIndex];
        const correctIndex = Math.floor(Math.random() * 5);
        const options = Array(5).fill(mainEmoji);
        options[correctIndex] = diffEmoji;

        setCaptcha({ options, correctIndex });
        setCaptchaVerified(false);
        setFormData(prev => ({ ...prev, captchaInput: '' }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaClick = (index) => {
        if (index === captcha.correctIndex) {
            setCaptchaVerified(true);
            setStatus({ type: '', msg: '' });
        } else {
            setStatus({ type: 'danger', msg: t('contact.captcha.error') });
            generateCaptcha();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', msg: '' });

        if (!captchaVerified) {
            setStatus({ type: 'danger', msg: t('contact.captcha.error') });
            return;
        }

        setIsSubmitting(true);

        try {
            const formId = import.meta.env.VITE_FORMSPREE_ID;

            if (!formId) {
                console.error('Formspree ID is not configured');
                setStatus({ type: 'danger', msg: t('contact.error') });
                setIsSubmitting(false);
                return;
            }

            const formDataPayload = new FormData();
            formDataPayload.append('name', formData.name);
            formDataPayload.append('email', formData.email);
            formDataPayload.append('message', formData.message);

            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formDataPayload
            });

            if (response.ok) {
                setStatus({ type: 'success', msg: t('contact.success') });
                setFormData({ name: '', email: '', message: '', captchaInput: '' });
                generateCaptcha();
            } else {
                setStatus({ type: 'danger', msg: t('contact.error') });
            }
        } catch (error) {
            setStatus({ type: 'danger', msg: t('contact.error') });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Row className="justify-content-center">
            <Col md={10} lg={8}>
                <GlassContainer className="p-4 p-md-5">
                    <h2 className="text-fluid-lg text-center mb-5">{t('contact.title')}</h2>

                    {status.msg && (
                        <Alert
                            variant={status.type}
                            dismissible
                            onClose={() => setStatus({ type: '', msg: '' })}
                            className="glass-effect border-0 text-white mb-4"
                            style={{ background: status.type === 'success' ? 'rgba(25, 135, 84, 0.2)' : 'rgba(220, 53, 69, 0.2)' }}
                        >
                            {status.msg}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold opacity-75">{t('contact.name')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="bg-dark text-white border-secondary py-3"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold opacity-75">{t('contact.email')}</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="bg-dark text-white border-secondary py-3"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold opacity-75">{t('contact.message')}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white border-secondary"
                            />
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label className="small fw-bold opacity-75 mb-3">
                                {t('contact.captcha.question')}
                            </Form.Label>
                            <div className="d-flex flex-wrap gap-2">
                                {captcha.options.map((emoji, index) => (
                                    <Button
                                        key={index}
                                        variant={captchaVerified && index === captcha.correctIndex ? "success" : "outline-secondary"}
                                        onClick={() => handleCaptchaClick(index)}
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
