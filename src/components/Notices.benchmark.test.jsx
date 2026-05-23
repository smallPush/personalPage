import React from 'react';
import { render, act } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Notices from './Notices';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key, i18n: { language: 'en', changeLanguage: vi.fn() } }),
}));

describe('Notices Benchmark', () => {
  it('measures performance of the fetchNotices effect block execution', async () => {
    const ITERATIONS = 1000;

    // We will measure time to render multiple times which triggers the useEffect inside Notices
    const start = performance.now();

    // Initial render
    let wrapper;
    await act(async () => {
        wrapper = render(
          <MemoryRouter>
            <Notices />
          </MemoryRouter>
        );
    });

    // Re-render multiple times
    await act(async () => {
        for (let i = 0; i < ITERATIONS; i++) {
            wrapper.rerender(
              <MemoryRouter>
                <Notices />
              </MemoryRouter>
            );
        }
    });

    const end = performance.now();
    const timeTaken = end - start;
    console.log(`Notices benchmark: ${timeTaken.toFixed(2)}ms for ${ITERATIONS} iterations`);
    expect(true).toBe(true);
  }, 30000); // 30s timeout
});
