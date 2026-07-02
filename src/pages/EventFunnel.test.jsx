import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import EventFunnel from './EventFunnel';
import useSeo from '../utils/useSeo';

vi.mock('../utils/useSeo', () => ({
  default: vi.fn()
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, defaultValue) => defaultValue || key
  })
}));

describe('EventFunnel Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <EventFunnel />
      </MemoryRouter>
    );

  it('renders the event funnel sections', () => {
    renderComponent();

    expect(screen.getByText('eventFunnel.hero.title')).toBeInTheDocument();
    expect(screen.getByText('eventFunnel.value.registration.title')).toBeInTheDocument();
    expect(screen.getByText('eventFunnel.journey.title')).toBeInTheDocument();
    expect(screen.getByText('eventFunnel.deliverables.title')).toBeInTheDocument();
    expect(screen.getByText('eventFunnel.cta.title')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'eventFunnel.hero.primaryCta' })).toHaveAttribute('href', '/#contact');
    expect(screen.getByRole('button', { name: 'eventFunnel.cta.button' })).toHaveAttribute('href', '/#contact');
  });

  it('calls useSeo with expected parameters', () => {
    renderComponent();

    expect(useSeo).toHaveBeenCalledWith(
      'Event Registration Funnel for Nonprofits - SmallPush',
      'Landing, registrations, attendance tracking and payments for nonprofit events.',
      {
        image: '/logo.png',
        url: window.location.href,
        keywords: 'event funnel, nonprofit events, registrations, attendance, payments, CiviCRM'
      }
    );
  });
});
