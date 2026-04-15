import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import DonorFunnel from './DonorFunnel';
import useSeo from '../utils/useSeo';

// Mock useSeo
vi.mock('../utils/useSeo', () => ({
  default: vi.fn()
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, defaultValue) => defaultValue || key
  })
}));

describe('DonorFunnel Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <DonorFunnel />
      </MemoryRouter>
    );

  it('renders the main sections using translation keys', () => {
    renderComponent();

    // Hero Section
    expect(screen.getByText('donorFunnel.hero.title')).toBeInTheDocument();
    expect(screen.getByText('donorFunnel.hero.subtitle')).toBeInTheDocument();

    // Narrative Section
    expect(screen.getByText('donorFunnel.narrative.title')).toBeInTheDocument();
    expect(screen.getByText('donorFunnel.narrative.text')).toBeInTheDocument();

    // Tech Ecosystem Section
    expect(screen.getByText('donorFunnel.ecosystem.title')).toBeInTheDocument();

    // Donor Journey Section
    expect(screen.getByText('donorFunnel.journey.title')).toBeInTheDocument();

    // CTA Section
    expect(screen.getByText('donorFunnel.cta.title')).toBeInTheDocument();

    const ctaButton = screen.getByRole('button', { name: 'donorFunnel.cta.button' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/#contact');
  });

  it('calls useSeo with expected parameters', () => {
    // Need to set window.location.href or use what jsdom provides natively.
    // jsdom defaults to http://localhost:3000/
    renderComponent();

    expect(useSeo).toHaveBeenCalledWith(
      'AI Donor Funnel - SmallPush',
      'Transforming interactions into impact through AI.',
      {
        image: '/logo.png',
        url: window.location.href,
        keywords: 'donor funnel, AI, CiviCRM, Symfony, LangChain, automation'
      }
    );
  });
});
