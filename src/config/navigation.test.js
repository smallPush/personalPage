import { describe, it, expect } from 'vitest';
import { NAV_LINKS } from './navigation';

describe('navigation configuration', () => {
  it('should export NAV_LINKS as an array', () => {
    expect(Array.isArray(NAV_LINKS)).toBe(true);
    expect(NAV_LINKS.length).toBeGreaterThan(0);
  });

  it('should contain links with expected properties', () => {
    NAV_LINKS.forEach(link => {
      // The application code uses `to` and `labelKey`, but we also check
      // for `href` and `label` to align with the original request specification
      expect(link.to || link.href).toBeDefined();
      expect(link.labelKey || link.label).toBeDefined();
    });
  });
});
