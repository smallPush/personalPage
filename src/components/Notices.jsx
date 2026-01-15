import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { notices } from '../data/notices';

const Notices = () => {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState({});

    useEffect(() => {
        const fetchNotices = async () => {
            const loadedPosts = {};
            for (const notice of notices) {
                const lang = i18n.language.split('-')[0]; // simple check for 'es', 'en', etc.
                const prefix = lang === 'es' ? 'es_' : '';
                const filename = `${prefix}${notice.filename}`;

                try {
                    // Start by trying to fetch the language-specific version
                    let response = await fetch(`/notices/${filename}`);

                    // Fallback to default if not found (and if we tried a prefixed one)
                    if (!response.ok && prefix !== '') {
                        response = await fetch(`/notices/${notice.filename}`);
                    }

                    if (response.ok) {
                        const text = await response.text();
                        loadedPosts[notice.id] = text;
                    } else {
                        console.error(`Failed to load notice: ${notice.filename}`);
                    }
                } catch (error) {
                    console.error(`Error loading notice: ${notice.filename}`, error);
                }
            }
            setPosts(loadedPosts);
        };

        fetchNotices();
    }, [i18n.language]);

    return (
        <section id="notices" className="py-5 bg-light">
            <Container>
                <h2 className="text-center mb-5">{t('notices.title', 'News')}</h2>
                <Row className="justify-content-center">
                    {notices.map((notice) => (
                        <Col key={notice.id} md={10} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-between text-muted mb-3">
                                        <small>{notice.date}</small>
                                    </div>
                                    <div className="markdown-content">
                                        {posts[notice.id] ? (
                                            <ReactMarkdown>{posts[notice.id]}</ReactMarkdown>
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Notices;
