import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { notices } from '../data/notices';
import useSeo from '../utils/useSeo';

const Notices = ({ singleNoticeId }) => {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState({});

    const displayNotices = useMemo(() => {
        if (singleNoticeId) {
            return notices.filter(n => n.id === singleNoticeId);
        }
        return notices;
    }, [singleNoticeId]);

    // SEO management for single notice view
    const currentNotice = singleNoticeId ? notices.find(n => n.id === singleNoticeId) : null;
    useSeo(
        currentNotice?.seoTitle || (singleNoticeId ? null : t('notices.seoTitle', 'News - SmallPush')),
        currentNotice?.seoDescription || (singleNoticeId ? null : t('notices.seoDescription', 'Latest news and updates from SmallPush.'))
    );

    useEffect(() => {
        const fetchNotices = async () => {
            const loadedPosts = {};
            for (const notice of displayNotices) {
                const lang = i18n.language.split('-')[0];
                const prefix = lang === 'es' ? 'es_' : '';
                const filename = `${prefix}${notice.filename}`;

                try {
                    let response = await fetch(`/notices/${filename}`);
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
    }, [i18n.language, displayNotices]);

    // structured data for SEO
    const jsonLd = useMemo(() => {
        if (!currentNotice) return null;
        return {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": currentNotice.seoTitle,
            "datePublished": currentNotice.date,
            "description": currentNotice.seoDescription,
            "author": {
                "@type": "Organization",
                "name": "SmallPush"
            }
        };
    }, [currentNotice]);

    return (
        <section id="notices" className="py-5 bg-light">
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="mb-0">{singleNoticeId ? t('notices.itemTitle', 'News Item') : t('notices.title', 'News')}</h2>
                    {singleNoticeId && (
                        <Button as={Link} to="/news" variant="outline-primary">
                            {t('notices.back', 'Back to News')}
                        </Button>
                    )}
                </div>
                <Row className="justify-content-center">
                    {displayNotices.map((notice) => (
                        <Col key={notice.id} md={10} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-between text-muted mb-3">
                                        <small>{notice.date}</small>
                                        {!singleNoticeId && (
                                            <Link to={`/news/${notice.id}`} className="btn btn-link btn-sm p-0">
                                                {t('notices.viewLink', 'Permalink')}
                                            </Link>
                                        )}
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
                    {displayNotices.length === 0 && (
                        <Col md={10} className="text-center">
                            <p>{t('notices.notFound', 'News item not found.')}</p>
                            <Button as={Link} to="/news" variant="primary">
                                {t('notices.back', 'Back to News')}
                            </Button>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    );
};

export default Notices;
