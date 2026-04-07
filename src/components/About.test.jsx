import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import About from './About';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('About Component', () => {
  it('renders the about title', () => {
    render(<About />);
    const titleElement = screen.getByRole('heading', { level: 2, name: 'about.title' });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the about text', () => {
    render(<About />);
    const textElement = screen.getByText('about.text');
    expect(textElement).toBeInTheDocument();
  });

  it('is contained within a GlassContainer with appropriate classes', () => {
    const { container } = render(<About />);
    const glassContainer = container.querySelector('.glass-effect');
    expect(glassContainer).toBeInTheDocument();
    expect(glassContainer).toHaveClass('text-center', 'p-5');
  });
});
