import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('QuoteCalculator', () => {
  it('renders correctly and shows default cost', () => {
    render(
      <BrowserRouter>
        <QuoteCalculator />
      </BrowserRouter>
    );

    // Initial default project type is 'civi' which has rate 50. Default hours is 25. Cost is 1250.
    expect(screen.getByText('€1,250')).toBeInTheDocument();
  });

  it('changes project type and updates cost', () => {
    render(
      <BrowserRouter>
        <QuoteCalculator />
      </BrowserRouter>
    );

    // Initial default project type is 'civi' which has rate 50. Default hours is 25. Cost is 1250.
    expect(screen.getByText('€1,250')).toBeInTheDocument();

    // Change to 'ai' which has rate 80.
    const aiButton = screen.getByText('quote.projectType.ai');
    fireEvent.click(aiButton);

    // 25 hours * 80 rate = 2000
    expect(screen.getByText('€2,000')).toBeInTheDocument();
  });

  it('changes hours and updates cost', () => {
    render(
      <BrowserRouter>
        <QuoteCalculator />
      </BrowserRouter>
    );

    // Initial default project type is 'civi' which has rate 50. Default hours is 25. Cost is 1250.
    expect(screen.getByText('€1,250')).toBeInTheDocument();

    const rangeInput = screen.getByRole('slider');

    // Change hours to 10
    fireEvent.change(rangeInput, { target: { value: 10 } });

    // 10 hours * 50 rate = 500
    expect(screen.getByText('€500')).toBeInTheDocument();
  });

  it('changes both project type and hours', () => {
    render(
      <BrowserRouter>
        <QuoteCalculator />
      </BrowserRouter>
    );

    const rangeInput = screen.getByRole('slider');
    const aiButton = screen.getByText('quote.projectType.ai');

    fireEvent.change(rangeInput, { target: { value: 50 } });
    fireEvent.click(aiButton);

    // 50 hours * 80 rate = 4000
    expect(screen.getByText('€4,000')).toBeInTheDocument();
  });
});
