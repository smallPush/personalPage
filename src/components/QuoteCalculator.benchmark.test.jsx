import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuoteCalculator from './QuoteCalculator';
import { describe, it, expect, vi } from 'vitest';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str, defaultStr) => defaultStr || str,
    };
  },
}));

// Mock HashLink
vi.mock('react-router-hash-link', () => ({
  // eslint-disable-next-line no-unused-vars
  HashLink: ({ children, smooth, ...props }) => <a {...props}>{children}</a>,
}));

describe('QuoteCalculator Benchmark', () => {
  it('measures performance of many renders and state updates', () => {
    const ITERATIONS = 1000;
    const projectTypeIds = ['civi', 'drupal', 'payment', 'fiscal', 'ads', 'ai'];

    render(
      <BrowserRouter>
        <QuoteCalculator />
      </BrowserRouter>
    );

    const rangeInput = screen.getByRole('slider');

    const startTime = performance.now();

    for (let i = 0; i < ITERATIONS; i++) {
      // Toggle hours
      fireEvent.change(rangeInput, { target: { value: 10 + (i % 90) } });

      // Toggle project type
      const typeToClick = projectTypeIds[i % projectTypeIds.length];
      const button = screen.getByText(`quote.projectType.${typeToClick}`);
      fireEvent.click(button);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    expect(duration).toBeGreaterThan(0);
    cleanup();
  }, 10000); // 10 seconds timeout
});
