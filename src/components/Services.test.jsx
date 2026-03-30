import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Services from './Services';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('Services Component', () => {
  it('renders the main title', () => {
    render(<Services />);
    const mainTitle = screen.getByRole('heading', { level: 2, name: 'services.title' });
    expect(mainTitle).toBeInTheDocument();
  });

  it('renders all 6 service items with correct titles, texts, and icons', () => {
    render(<Services />);

    // Define expected services structure based on the component's internal array
    const expectedServices = [
      { title: 'services.civi.title', text: 'services.civi.text', icon: '📊' },
      { title: 'services.drupal.title', text: 'services.drupal.text', icon: '💧' },
      { title: 'services.payment.title', text: 'services.payment.text', icon: '💳' },
      { title: 'services.fiscal.title', text: 'services.fiscal.text', icon: '🧾' },
      { title: 'services.ads.title', text: 'services.ads.text', icon: '📈' },
      { title: 'services.ai.title', text: 'services.ai.text', icon: '🤖' }
    ];

    // Check if each expected service item is rendered
    expectedServices.forEach(service => {
      // Find the heading for the service
      const titleElement = screen.getByRole('heading', { level: 4, name: service.title });
      expect(titleElement).toBeInTheDocument();

      // Find the text for the service
      const textElement = screen.getByText(service.text);
      expect(textElement).toBeInTheDocument();

      // Find the icon for the service
      const iconElement = screen.getByText(service.icon);
      expect(iconElement).toBeInTheDocument();
    });
  });

  it('renders exactly 6 service containers', () => {
    const { container } = render(<Services />);

    // Find all rendered columns containing services
    // The component maps the services array to Col elements
    const serviceTitles = screen.getAllByRole('heading', { level: 4 });
    expect(serviceTitles).toHaveLength(6);
  });
});
