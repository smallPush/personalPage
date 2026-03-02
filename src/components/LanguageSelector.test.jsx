import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageSelector from './LanguageSelector';

// Mock react-i18next
const mockChangeLanguage = vi.fn();
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: mockChangeLanguage,
      language: 'en', // Default language for testing
    },
  }),
}));

describe('LanguageSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<LanguageSelector />);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.getByText('CA')).toBeInTheDocument();
  });

  it('calls changeLanguage with correct argument when EN button is clicked', () => {
    render(<LanguageSelector />);
    const enButton = screen.getByText('EN');
    fireEvent.click(enButton);
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });

  it('calls changeLanguage with correct argument when ES button is clicked', () => {
    render(<LanguageSelector />);
    const esButton = screen.getByText('ES');
    fireEvent.click(esButton);
    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });

  it('calls changeLanguage with correct argument when CA button is clicked', () => {
    render(<LanguageSelector />);
    const caButton = screen.getByText('CA');
    fireEvent.click(caButton);
    expect(mockChangeLanguage).toHaveBeenCalledWith('ca');
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
  });
});