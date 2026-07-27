import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import * as cookieConsent from './utils/cookieConsent';

// Mock components
vi.mock('./components/Navigation', () => ({
  default: () => <div data-testid="mock-navigation">Navigation</div>,
}));

vi.mock('./components/Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}));

vi.mock('./components/CookieBanner', () => ({
  default: () => <div data-testid="mock-cookie-banner">CookieBanner</div>,
}));

vi.mock('./pages/Home', () => ({
  default: () => <div data-testid="mock-home">Home Page</div>,
}));

vi.mock('./pages/News', () => ({
  default: () => <div data-testid="mock-news">News Page</div>,
}));

vi.mock('./pages/DonorFunnel', () => ({
  default: () => <div data-testid="mock-donor-funnel">Donor Funnel Page</div>,
}));

// Mock utils
vi.mock('./utils/cookieConsent', () => ({
  initializeConsent: vi.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderApp = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  it('calls initializeConsent on mount', () => {
    renderApp();
    expect(cookieConsent.initializeConsent).toHaveBeenCalledTimes(1);
  });

  it('renders common layout components (Navigation, Footer, CookieBanner)', () => {
    renderApp();
    expect(screen.getByTestId('mock-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cookie-banner')).toBeInTheDocument();
  });

  it('renders Home component for root route ("/")', () => {
    renderApp('/');
    expect(screen.getByTestId('mock-home')).toBeInTheDocument();
  });

  it('renders News component for "/news" route', () => {
    renderApp('/news');
    expect(screen.getByTestId('mock-news')).toBeInTheDocument();
  });

  it('renders News component for "/news/:id" route', () => {
    renderApp('/news/123');
    expect(screen.getByTestId('mock-news')).toBeInTheDocument();
  });

  it('renders DonorFunnel component for "/donor-funnel" route', () => {
    renderApp('/donor-funnel');
    expect(screen.getByTestId('mock-donor-funnel')).toBeInTheDocument();
  });
});
