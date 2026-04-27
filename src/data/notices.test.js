import { describe, it, expect } from 'vitest';
import { notices } from './notices';

describe('Notices Data Validation', () => {
  it('should be a non-empty array', () => {
    expect(Array.isArray(notices)).toBe(true);
    expect(notices.length).toBeGreaterThan(0);
  });

  it('should have unique IDs for all notices', () => {
    const ids = notices.map(notice => notice.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have filenames ending with .md', () => {
    notices.forEach(notice => {
      expect(notice.filename).toMatch(/\.md$/);
    });
  });

  it('should have valid date strings in YYYY-MM-DD format', () => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    notices.forEach(notice => {
      expect(notice.date).toMatch(dateFormatRegex);
      const dateObj = new Date(notice.date);
      expect(isNaN(dateObj.getTime())).toBe(false);
    });
  });

  it('should contain localized seoTitle, seoDescription, and keywords (en, es, ca)', () => {
    const locales = ['en', 'es', 'ca'];
    notices.forEach(notice => {
      ['seoTitle', 'seoDescription', 'keywords'].forEach(field => {
        expect(notice[field]).toBeDefined();
        locales.forEach(locale => {
          expect(typeof notice[field][locale]).toBe('string');
          expect(notice[field][locale].trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  it('should have a tags array with non-empty strings', () => {
    notices.forEach(notice => {
      expect(Array.isArray(notice.tags)).toBe(true);
      expect(notice.tags.length).toBeGreaterThan(0);
      notice.tags.forEach(tag => {
        expect(typeof tag).toBe('string');
        expect(tag.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
