import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('Hero Component', () => {
  const renderHero = () => {
    return render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
  };

  it('renders the main title', () => {
    renderHero();
    const titleElement = screen.getByRole('heading', { level: 1, name: 'SmallPush' });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the subtitle with translation key', () => {
    renderHero();
    const subtitleElement = screen.getByText('hero.subtitle');
    expect(subtitleElement).toBeInTheDocument();
  });

  it('renders the call-to-action button with translation key and correct link', () => {
    renderHero();
    const buttonElement = screen.getByRole('button', { name: 'hero.cta' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('href', '/#contact');
  });

  it('renders the image with correct alt text and source', () => {
    renderHero();
    const imageElement = screen.getByRole('img', { name: 'SmallPush Icon' });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'logo-alt.svg');
  });
});
