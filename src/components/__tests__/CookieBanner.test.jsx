import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key
    })
}));

describe('CookieBanner interactions', () => {
    let CookieBanner;

    beforeEach(async () => {
        vi.resetModules();

        // Mock localStorage on global
        let store = {};
        const mockLocalStorage = {
            getItem: vi.fn((key) => store[key] || null),
            setItem: vi.fn((key, value) => {
                store[key] = value.toString();
            }),
            clear: vi.fn(() => {
                store = {};
            })
        };
        Object.defineProperty(globalThis, 'localStorage', {
            value: mockLocalStorage,
            configurable: true
        });

        // Mock window.gtag on global
        Object.defineProperty(globalThis, 'window', {
            value: {
                gtag: vi.fn()
            },
            configurable: true
        });

        // Load the module via dynamic import
        const module = await import('../CookieBanner.jsx');
        CookieBanner = module.default;
    });

    it('renders the banner when there is no stored consent', () => {
        render(<CookieBanner />);

        expect(screen.getByText('cookies.banner.text')).toBeInTheDocument();
        expect(screen.getByText('cookies.banner.acceptAll')).toBeInTheDocument();
        expect(screen.getByText('cookies.banner.rejectAll')).toBeInTheDocument();
        expect(screen.getByText('cookies.banner.settings')).toBeInTheDocument();
    });

    it('does not render the banner when consent is already stored', async () => {
        globalThis.localStorage.setItem('cookie-consent-preferences', JSON.stringify({ analytics: true, ads: true }));

        // We need to re-import the module to pick up the updated localStorage
        // but since getStoredConsent is called during initialization,
        // we might just render it and check
        render(<CookieBanner />);

        expect(screen.queryByText('cookies.banner.text')).not.toBeInTheDocument();
    });

    it('accepts all cookies and hides banner', async () => {
        render(<CookieBanner />);

        const acceptBtn = screen.getByText('cookies.banner.acceptAll');
        fireEvent.click(acceptBtn);

        expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
            'cookie-consent-preferences',
            JSON.stringify({ analytics: true, ads: true })
        );
        expect(screen.queryByText('cookies.banner.text')).not.toBeInTheDocument();
    });

    it('rejects all cookies and hides banner', async () => {
        render(<CookieBanner />);

        const rejectBtn = screen.getByText('cookies.banner.rejectAll');
        fireEvent.click(rejectBtn);

        expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
            'cookie-consent-preferences',
            JSON.stringify({ analytics: false, ads: false })
        );
        expect(screen.queryByText('cookies.banner.text')).not.toBeInTheDocument();
    });

    it('opens settings modal and saves preferences', async () => {
        render(<CookieBanner />);

        // Open settings
        const settingsBtn = screen.getByText('cookies.banner.settings');
        fireEvent.click(settingsBtn);

        // Modal should be visible
        expect(screen.getByText('cookies.settings.title')).toBeInTheDocument();

        // Find analytics toggle (it's a checkbox)
        // Since the label doesn't directly wrap the input with htmlFor, we can just find it by role
        const checkboxes = screen.getAllByRole('checkbox');
        // The second one is analytics (the first is necessary and disabled)
        const analyticsCheckbox = checkboxes[1];

        // Toggle analytics on
        fireEvent.click(analyticsCheckbox);

        // Click save
        const saveBtn = screen.getByText('cookies.settings.save');
        fireEvent.click(saveBtn);

        expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
            'cookie-consent-preferences',
            JSON.stringify({ analytics: true, ads: false })
        );

        // Banner and modal should be hidden
        expect(screen.queryByText('cookies.banner.text')).not.toBeInTheDocument();
        expect(screen.queryByText('cookies.settings.title')).not.toBeInTheDocument();
    });
});
