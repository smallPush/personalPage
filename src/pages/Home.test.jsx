import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Home from './Home';
import useSeo from '../utils/useSeo';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key, defaultValue) => defaultValue || key
    })
}));

vi.mock('../utils/useSeo', () => ({
    default: vi.fn()
}));

vi.mock('../components/Hero', () => ({
    default: () => <div data-testid="mock-hero" />
}));

vi.mock('../components/About', () => ({
    default: () => <div data-testid="mock-about" />
}));

vi.mock('../components/Services', () => ({
    default: () => <div data-testid="mock-services" />
}));

vi.mock('../components/QuoteCalculator', () => ({
    default: () => <div data-testid="mock-quote" />
}));

vi.mock('../components/ContactForm', () => ({
    default: () => <div data-testid="mock-contact" />
}));

describe('Home Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all sections and components', () => {
        render(<Home />);

        expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
        expect(screen.getByTestId('mock-about')).toBeInTheDocument();
        expect(screen.getByTestId('mock-services')).toBeInTheDocument();
        expect(screen.getByTestId('mock-quote')).toBeInTheDocument();
        expect(screen.getByTestId('mock-contact')).toBeInTheDocument();
    });

    it('calls useSeo with correct parameters', () => {
        render(<Home />);

        expect(useSeo).toHaveBeenCalledWith(
            'SmallPush - CiviCRM & Drupal Experts',
            'Expert CiviCRM and Drupal Solutions for NGOs and Companies.',
            expect.objectContaining({
                image: '/logo.png',
                url: window.location.href,
                keywords: 'civicrm, drupal, software, development, smallpush, ngo'
            })
        );
    });
});
