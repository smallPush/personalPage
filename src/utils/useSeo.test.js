import { renderHook, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import useSeo from './useSeo';

describe('useSeo Hook', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.title = '';
  });

  afterEach(() => {
    cleanup();
  });

  const getMetaContent = (name, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    const tag = document.querySelector(`meta[${attr}="${name}"]`);
    return tag ? tag.getAttribute('content') : null;
  };

  it('sets basic title and description correctly', () => {
    renderHook(() => useSeo('Test Title', 'Test Description'));
    expect(document.title).toBe('Test Title');
    expect(getMetaContent('description')).toBe('Test Description');
  });

  it('sets full options correctly (Open Graph, Twitter, etc.)', () => {
    renderHook(() =>
      useSeo('Full Title', 'Full Desc', {
        keywords: 'test, keywords',
        image: '/test-image.jpg',
        url: 'https://example.com/page',
        type: 'article',
        siteName: 'TestSite',
        twitterCard: 'summary',
      })
    );

    expect(document.title).toBe('Full Title');
    expect(getMetaContent('keywords')).toBe('test, keywords');
    expect(getMetaContent('og:title', true)).toBe('Full Title');
    expect(getMetaContent('og:description', true)).toBe('Full Desc');
    expect(getMetaContent('og:type', true)).toBe('article');
    expect(getMetaContent('og:site_name', true)).toBe('TestSite');
    // window.location.origin is usually http://localhost in jsdom
    expect(getMetaContent('og:image', true)).toMatch(/\/test-image\.jpg$/);
    expect(getMetaContent('og:url', true)).toBe('https://example.com/page');
    expect(getMetaContent('twitter:card')).toBe('summary');
    expect(getMetaContent('twitter:image')).toMatch(/\/test-image\.jpg$/);
  });

  it('sets absolute image URL correctly', () => {
    renderHook(() =>
      useSeo('Title', 'Desc', { image: 'https://example.com/image.jpg' })
    );
    expect(getMetaContent('og:image', true)).toBe('https://example.com/image.jpg');
    expect(getMetaContent('twitter:image')).toBe('https://example.com/image.jpg');
  });

  it('does not create meta tags for missing content', () => {
    renderHook(() => useSeo('Title', ''));
    expect(getMetaContent('description')).toBeNull();
  });

  it('updates existing tags on re-render without duplicating', () => {
    const { rerender } = renderHook(
      ({ t, d }) => useSeo(t, d),
      { initialProps: { t: 'Title 1', d: 'Desc 1' } }
    );

    expect(document.title).toBe('Title 1');
    expect(getMetaContent('description')).toBe('Desc 1');
    expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1);

    rerender({ t: 'Title 2', d: 'Desc 2' });

    expect(document.title).toBe('Title 2');
    expect(getMetaContent('description')).toBe('Desc 2');
    expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1);
  });
});
