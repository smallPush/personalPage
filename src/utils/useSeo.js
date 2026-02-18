import { useEffect } from 'react';

/**
 * Custom hook to manage SEO tags (title and description).
 * @param {string} title - The title of the page.
 * @param {string} description - The meta description of the page.
 */
const useSeo = (title, description, options = {}) => {
  const {
    keywords,
    image,
    url,
    type = 'website',
    siteName = 'SmallPush',
    twitterCard = 'summary_large_image',
  } = options;

  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Helper to update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    // Standard Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);

    // Ensure absolute URL for image
    let fullImageUrl = image;
    if (image && image.startsWith('/')) {
      fullImageUrl = `${window.location.origin}${image}`;
    }

    if (fullImageUrl) updateMetaTag('og:image', fullImageUrl, true);
    if (url) updateMetaTag('og:url', url, true);

    // Twitter
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (fullImageUrl) updateMetaTag('twitter:image', fullImageUrl);

  }, [title, description, keywords, image, url, type, siteName, twitterCard]);
};

export default useSeo;
