import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Row, Col, Button, Badge, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { notices } from '../data/notices';
import useSeo from '../utils/useSeo';
import GlassContainer from './GlassContainer';


// Pre-load all markdown files at build time
const noticeFiles = import.meta.glob('/public/notices/*.md', { query: '?raw', import: 'default', eager: true });

// --- Module-level Constants for Performance ---

// Pre-sort notices descending by date
const sortedNotices = [...notices].sort((a, b) => new Date(b.date) - new Date(a.date));

// Pre-compute map of notice IDs to arrays (for unified return type)
const noticesById = new Map();
sortedNotices.forEach(n => noticesById.set(n.id, [n]));

// Pre-compute map of tags to notice arrays
const noticesByTag = new Map();
sortedNotices.forEach(n => {
    if (n.tags) {
        n.tags.forEach(tag => {
            if (!noticesByTag.has(tag)) {
                noticesByTag.set(tag, []);
            }
            noticesByTag.get(tag).push(n);
        });
    }
});

// Pre-compute unique tags
const moduleUniqueTags = Array.from(new Set(notices.flatMap(notice => notice.tags || []))).sort();

// ----------------------------------------------

const NoticeContent = ({ content, singleNoticeId, noticeId, t }) => {
    const lines = useMemo(() => content.split('\n'), [content]);
    const isTruncated = !singleNoticeId && lines.length > 10;
    const displayContent = useMemo(() => {
        if (singleNoticeId) return content;
        return isTruncated ? lines.slice(0, 10).join('\n') + '...' : content;
    }, [content, singleNoticeId, lines, isTruncated]);

    return (
        <>
            <ReactMarkdown
                components={{
                    a: ({ ...props }) => {
                        const href = props.href || '';
                        const isInternal = href.startsWith('/') || href.startsWith('#');
                        const isHash = href.includes('#');

                        if (isInternal) {
                            if (isHash) {
                                return <HashLink smooth to={href} {...props} />;
                            }
                            return <Link to={href} {...props} />;
                        }
                        return <a target="_blank" rel="noopener noreferrer" {...props} />;
                    }
                }}
            >
                {displayContent}
            </ReactMarkdown>
            {isTruncated && (
                <div className="mt-4">
                    <Button as={Link} to={`/news/${noticeId}`} variant="primary" className="rounded-pill px-4">
                        {t('notices.readMore', 'Read More')}
                    </Button>
                </div>
            )}
        </>
    );
};

const NoticeFilter = ({ selectedTag, setSelectedTag, t }) => {
    const [tagSearch, setTagSearch] = useState('');

    const filteredTags = useMemo(() => {
        if (!tagSearch.trim()) return moduleUniqueTags;
        return moduleUniqueTags.filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()));
    }, [tagSearch]);

    return (
        <GlassContainer className="mb-5 p-4 rounded-4 bg-dark bg-opacity-25 border border-white border-opacity-10 position-relative overflow-hidden">
            {/* Decorative glow */}
            <div className="position-absolute top-0 start-0 w-50 h-100 bg-primary opacity-5 blur-3xl z-n1" style={{ filter: 'blur(80px)' }}></div>

            <Row className="align-items-center g-4">
                <Col lg={5}>
                    <div className="position-relative">
                        {/* Search Icon */}
                        <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        <Form.Control
                            type="text"
                            placeholder={t('notices.searchTagsPlaceholder', 'Search tags...')}
                            value={tagSearch}
                            onChange={(e) => setTagSearch(e.target.value)}
                            className="bg-black bg-opacity-50 text-white border-secondary rounded-pill ps-5 pe-5 py-2 transition-all focus-ring-primary"
                        />
                        {/* Clear Button */}
                        {tagSearch && (
                            <button
                                onClick={() => setTagSearch('')}
                                className="position-absolute top-50 end-0 translate-middle-y pe-3 bg-transparent border-0 text-muted hover-text-white transition-all"
                                style={{ cursor: 'pointer' }}
                                aria-label={t('notices.clearFilter', 'Clear filter')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        )}
                    </div>
                </Col>

                <Col lg={7}>
                    <div className="d-flex flex-wrap align-items-center gap-2">
                        <span className="text-white-50 small fw-bold text-uppercase tracking-wider me-2">
                            {t('notices.filterByTag', 'Filter by tag:')}
                        </span>
                        {filteredTags.map(tag => (
                            <Badge
                                key={tag}
                                bg={selectedTag === tag ? 'primary' : 'dark'}
                                text={selectedTag === tag ? 'white' : 'light'}
                                className={`px-3 py-2 rounded-pill cursor-pointer transition-all border ${selectedTag === tag
                                    ? 'border-primary shadow-sm scale-105'
                                    : 'border-secondary border-opacity-50 hover-bg-secondary opacity-75 hover-opacity-100'
                                    }`}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    transform: selectedTag === tag ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            >
                                {tag}
                            </Badge>
                        ))}
                        {selectedTag && (
                            <Button
                                variant="link"
                                className="text-decoration-none p-0 ms-1 text-muted small hover-text-white transition-all d-flex align-items-center"
                                onClick={() => setSelectedTag(null)}
                                size="sm"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                {t('notices.clearFilter', 'Clear')}
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </GlassContainer>
    );
};

const Notices = ({ singleNoticeId }) => {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState({});
    const [selectedTag, setSelectedTag] = useState(null);

    const currentLang = i18n.language.split('-')[0];

    const displayNotices = useMemo(() => {
        if (singleNoticeId) {
            return noticesById.get(singleNoticeId) || [];
        } else if (selectedTag) {
            return noticesByTag.get(selectedTag) || [];
        }
        return sortedNotices;
    }, [singleNoticeId, selectedTag]);

    // SEO management for single notice view
    const currentNotice = singleNoticeId ? noticesById.get(singleNoticeId)?.[0] : null;

    // Helper to get localized field or fallback to English
    const getLocalizedField = useCallback((fieldObj) => {
        if (!fieldObj) return '';
        if (typeof fieldObj === 'string') return fieldObj;
        return fieldObj[currentLang] || fieldObj['en'] || '';
    }, [currentLang]);

    useSeo(
        getLocalizedField(currentNotice?.seoTitle) || (singleNoticeId ? null : t('notices.seoTitle', 'News - SmallPush')),
        getLocalizedField(currentNotice?.seoDescription) || (singleNoticeId ? null : t('notices.seoDescription', 'Latest news and updates from SmallPush.')),
        {
            keywords: getLocalizedField(currentNotice?.keywords) || t('notices.seoKeywords', 'news, updates, technology, smallpush'),
            type: singleNoticeId ? 'article' : 'website',
            url: window.location.href,
            image: currentNotice?.image || '/logo.png' // Fallback to logo if no image
        }
    );

    useEffect(() => {
        const fetchNotices = async () => {
            const fetchPromises = displayNotices.map(async (notice) => {
                const prefix = currentLang === 'es' ? 'es_' : currentLang === 'ca' ? 'ca_' : '';
                const localizedPath = `/public/notices/${prefix}${notice.filename}`;
                const fallbackPath = `/public/notices/${notice.filename}`;

                try {
                    // Try localized version first
                    if (prefix !== '' && noticeFiles[localizedPath]) {
                        const text = noticeFiles[localizedPath];
                        return { id: notice.id, text };
                    }

                    // Fallback to default (English) version
                    if (noticeFiles[fallbackPath]) {
                        const text = noticeFiles[fallbackPath];
                        return { id: notice.id, text };
                    }

                    if (import.meta.env.DEV) {
                        console.error(`Failed to load notice: ${notice.filename}`);
                    }
                    return null;
                } catch (error) {
                    if (import.meta.env.DEV) {
                        console.error(`Error loading notice: ${notice.filename}`, error);
                    }
                    return null;
                }
            });

            const results = await Promise.all(fetchPromises);

            const loadedPosts = {};
            for (const result of results) {
                if (result) {
                    loadedPosts[result.id] = result.text;
                }
            }

            setPosts(loadedPosts);
        };

        fetchNotices();
    }, [currentLang, displayNotices]);

    // structured data for SEO
    const jsonLd = useMemo(() => {
        if (!currentNotice) return null;
        return {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": getLocalizedField(currentNotice.seoTitle),
            "datePublished": currentNotice.date,
            "description": getLocalizedField(currentNotice.seoDescription),
            "author": {
                "@type": "Organization",
                "name": "SmallPush"
            }
        };
    }, [currentNotice, getLocalizedField]);

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
                    <Button as={Link} to="/news" variant="primary" className="rounded-pill px-4">
                        {t('notices.back', 'Back to News')}
                    </Button>
                )}
            </div>

            {!singleNoticeId && (
                <NoticeFilter selectedTag={selectedTag} setSelectedTag={setSelectedTag} t={t} />
            )}
            <Row className="justify-content-center">
                {displayNotices.map((notice) => (
                    <Col key={notice.id} md={12} className="mb-5">
                        <GlassContainer style={{ padding: 'clamp(1.5rem, 5vw, 4rem)' }}>
                            <div className="d-flex justify-content-between text-muted mb-4 pb-3 border-bottom border-white border-opacity-10">
                                <div className="d-flex flex-column gap-2">
                                    <span className="small tracking-widest uppercase">{notice.date}</span>
                                    {notice.tags && (
                                        <div className="d-flex flex-wrap gap-1">
                                            {notice.tags.map(tag => (
                                                <Badge
                                                    key={tag}
                                                    bg="secondary"
                                                    className="opacity-75"
                                                    style={{ cursor: 'pointer', fontSize: '0.75rem' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (!singleNoticeId) setSelectedTag(tag);
                                                    }}
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {!singleNoticeId && (
                                    <Link to={`/news/${notice.id}`} className="text-primary text-decoration-none small fw-bold align-self-start">
                                        {t('notices.viewLink', 'Permalink').toUpperCase()} →
                                    </Link>
                                )}
                            </div>
                            <div className="markdown-content lead" style={{ opacity: 0.9 }}>
                                {posts[notice.id] ? (
                                    <NoticeContent
                                        content={posts[notice.id]}
                                        singleNoticeId={singleNoticeId}
                                        noticeId={notice.id}
                                        t={t}
                                    />
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
