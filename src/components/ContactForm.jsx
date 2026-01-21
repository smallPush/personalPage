import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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

        // Pick two distinct emojis
        const mainEmojiIndex = Math.floor(Math.random() * emojis.length);
        let diffEmojiIndex = Math.floor(Math.random() * emojis.length);

        while (diffEmojiIndex === mainEmojiIndex) {
            diffEmojiIndex = Math.floor(Math.random() * emojis.length);
        }

        const mainEmoji = emojis[mainEmojiIndex];
        const diffEmoji = emojis[diffEmojiIndex];

        // Create options array with 4 main emojis and 1 different emoji
        // We'll place the different one at a random position
        const correctIndex = Math.floor(Math.random() * 5);
        const options = Array(5).fill(mainEmoji);
        options[correctIndex] = diffEmoji;

        setCaptcha({ options, correctIndex });
        setCaptchaVerified(false);
        setFormData(prev => ({ ...prev, captchaInput: '' })); // Clear hidden input if any
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

        // Validate Captcha
        if (!captchaVerified) {
            setStatus({ type: 'danger', msg: t('contact.captcha.error') });
            return;
        }

        setIsSubmitting(true);

        try {
            // Use environment variable for the Formspree ID
            const formId = import.meta.env.VITE_FORMSPREE_ID;

            if (!formId) {
                console.error('Formspree ID is not configured (VITE_FORMSPREE_ID is missing)');
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
                headers: {
                    'Accept': 'application/json'
                },
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
        <section id="contact" className="py-5 bg-light">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm border-0">
                            <Card.Body className="p-4">
                                <h2 className="text-center mb-4">{t('contact.title')}</h2>

                                {status.msg && (
                                    <Alert variant={status.type} dismissible onClose={() => setStatus({ type: '', msg: '' })}>
                                        {status.msg}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>{t('contact.name')}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>{t('contact.email')}</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>{t('contact.message')}</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>
                                            {t('contact.captcha.question')}
                                        </Form.Label>
                                        <div className="d-flex justify-content-between gap-2">
                                            {captcha.options.map((emoji, index) => (
                                                <Button
                                                    key={index}
                                                    variant={captchaVerified && index === captcha.correctIndex ? "success" : "outline-secondary"}
                                                    onClick={() => handleCaptchaClick(index)}
                                                    className="flex-grow-1 fs-4"
                                                    disabled={captchaVerified && index !== captcha.correctIndex}
                                                    type="button"
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
                                            className="py-2 fw-bold"
                                        >
                                            {isSubmitting ? '...' : t('contact.submit')}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactForm;
