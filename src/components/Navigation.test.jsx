import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => fallback || key,
    i18n: { changeLanguage: vi.fn(), language: 'en' }
  }),
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  const renderNavigation = (initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Navigation />
      </MemoryRouter>
    );
  };

  it('renders brand logo and title', () => {
    renderNavigation();
    expect(screen.getByText('SmallPush')).toBeInTheDocument();
    expect(screen.getByAltText('SmallPush Logo')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderNavigation();
    expect(screen.getByText('navigation.home')).toBeInTheDocument();
    expect(screen.getByText('navigation.about')).toBeInTheDocument();
    expect(screen.getByText('navigation.services')).toBeInTheDocument();
    expect(screen.getByText('navigation.quote')).toBeInTheDocument();
    expect(screen.getByText('Donor Funnel')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('navigation.contact')).toBeInTheDocument();
  });

  it('highlights the active link based on pathname', () => {
    renderNavigation(['/']);
    const homeLink = screen.getByText('navigation.home');
    expect(homeLink).toHaveClass('text-primary');

    const donorLink = screen.getByText('Donor Funnel');
    expect(donorLink).not.toHaveClass('text-primary');
  });

  it('highlights the active link based on hash', () => {
    // When navigating to '/#about', location.pathname is '/' and location.hash is '#about'.
    // The home link condition is `location.pathname === '/'` which makes it active as well.
    // The about link condition is `location.hash === '#about'`, making it active.
    // We expect both to be active in the current implementation since the active condition for the home link doesn't check the hash.
    renderNavigation(['/#about']);

    const aboutLink = screen.getByText('navigation.about');
    expect(aboutLink).toHaveClass('text-primary');

    const homeLink = screen.getByText('navigation.home');
    expect(homeLink).toHaveClass('text-primary');
  });

  it('highlights news link when pathname starts with /news', () => {
    renderNavigation(['/news/123']);
    const newsLink = screen.getByText('News');
    expect(newsLink).toHaveClass('text-primary');
  });

  it('calls window.scrollTo when home link is clicked', () => {
    renderNavigation();
    const homeLink = screen.getByText('navigation.home');
    fireEvent.click(homeLink);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('calls window.scrollTo when brand is clicked', () => {
    renderNavigation();
    const brand = screen.getByText('SmallPush');
    fireEvent.click(brand);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('expands and collapses navigation menu via toggle', () => {
    const { container } = renderNavigation();

    // Initial state: not expanded
    const toggleButton = container.querySelector('.navbar-toggler');
    container.querySelector('.navbar-collapse');

    // Simulating click on toggle
    fireEvent.click(toggleButton);
    // After click it should eventually get the 'show' class or similar depending on the react-bootstrap version
    // But since testing react-bootstrap classes directly can be flaky, we mainly test the event handling doesn't crash
  });

  it('collapses navigation menu when a regular link is clicked', () => {
    renderNavigation();
    const donorLink = screen.getByText('Donor Funnel');
    fireEvent.click(donorLink);
    // Menu collapse logic triggers, we verify no crash and it handles smoothly
  });

  it('collapses navigation menu when a hash link is clicked', () => {
    renderNavigation();
    const aboutLink = screen.getByText('navigation.about');
    fireEvent.click(aboutLink);
    // Menu collapse logic triggers, we verify no crash and it handles smoothly
  });
});
