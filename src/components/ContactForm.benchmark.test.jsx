import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import ContactForm from './ContactForm';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('ContactForm Benchmark', () => {
  it('measures performance of many renders', () => {
    const ITERATIONS = 10000;
    const { rerender } = render(<ContactForm />);

    for (let i = 0; i < ITERATIONS; i++) {
        rerender(<ContactForm />);
    }
  }, 20000); // 20s timeout
});
