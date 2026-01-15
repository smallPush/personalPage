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

    const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, sum: 0 });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate new captcha on mount
    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        setCaptcha({ n1, n2, sum: n1 + n2 });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', msg: '' });

        // Validate Captcha
        if (parseInt(formData.captchaInput) !== captcha.sum) {
            setStatus({ type: 'danger', msg: t('contact.captcha.error') });
            generateCaptcha();
            setFormData({ ...formData, captchaInput: '' });
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
                                            {t('contact.captcha.question', { num1: captcha.n1, num2: captcha.n2 })}
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="captchaInput"
                                            value={formData.captchaInput}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('contact.captcha.label')}
                                        />
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
