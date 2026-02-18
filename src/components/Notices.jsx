import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { notices } from '../data/notices';
import useSeo from '../utils/useSeo';
import GlassContainer from './GlassContainer';

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
        currentNotice?.seoDescription || (singleNoticeId ? null : t('notices.seoDescription', 'Latest news and updates from SmallPush.')),
        {
            keywords: currentNotice?.keywords || t('notices.seoKeywords', 'news, updates, technology, smallpush'),
            type: singleNoticeId ? 'article' : 'website',
            url: window.location.href,
            image: currentNotice?.image || '/logo.png' // Fallback to logo if no image
        }
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
        <div id="notices" className="py-5">
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
            <div className="d-flex justify-content-between align-items-center mb-5 mt-4">
                <h2 className="text-fluid-lg mb-0">{singleNoticeId ? t('notices.itemTitle', 'News Item') : t('notices.title', 'News')}</h2>
                {singleNoticeId && (
                    <Button as={Link} to="/news" variant="outline-primary" className="rounded-pill px-4">
                        {t('notices.back', 'Back to News')}
                    </Button>
                )}
            </div>
            <Row className="justify-content-center">
                {displayNotices.map((notice) => (
                    <Col key={notice.id} md={12} className="mb-5">
                        <GlassContainer style={{ padding: 'clamp(1.5rem, 5vw, 4rem)' }}>
                            <div className="d-flex justify-content-between text-muted mb-4 pb-3 border-bottom border-white border-opacity-10">
                                <span className="small tracking-widest uppercase">{notice.date}</span>
                                {!singleNoticeId && (
                                    <Link to={`/news/${notice.id}`} className="text-primary text-decoration-none small fw-bold">
                                        {t('notices.viewLink', 'Permalink').toUpperCase()} →
                                    </Link>
                                )}
                            </div>
                            <div className="markdown-content lead" style={{ opacity: 0.9 }}>
                                {posts[notice.id] ? (
                                    <ReactMarkdown>{posts[notice.id]}</ReactMarkdown>
                                ) : (
                                    <div className="py-5 text-center opacity-50">{t('notices.loading', 'Loading content...')}</div>
                                )}
                            </div>
                        </GlassContainer>
                    </Col>
                ))}
                {displayNotices.length === 0 && (
                    <Col md={10} className="text-center py-5">
                        <p className="opacity-50">{t('notices.notFound', 'News item not found.')}</p>
                        <Button as={Link} to="/news" variant="primary" className="mt-3">
                            {t('notices.back', 'Back to News')}
                        </Button>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Notices;
