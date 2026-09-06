import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('Footer Component', () => {
  it('renders the footer element', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders the correct copyright year', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const currentYear = new Date().getFullYear();
    const copyrightRegex = new RegExp(`© ${currentYear} SMALLPUSH\\.`, 'i');

    // We expect the footer text to contain the copyright string.
    // Instead of using regex on the whole content, check if text match exists inside the container.
    const textElement = screen.getByText(copyrightRegex, { exact: false });
    expect(textElement).toBeInTheDocument();
  });

  it('uses the translation key for the rights string', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const translationElement = screen.getByText(/footer\.rights/i, { exact: false });
    expect(translationElement).toBeInTheDocument();
  });
});
