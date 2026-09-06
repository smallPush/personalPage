import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CiviCrmFunnel from './CiviCrmFunnel';
import useSeo from '../utils/useSeo';

vi.mock('../utils/useSeo', () => ({
  default: vi.fn()
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, defaultValue) => defaultValue || key
  })
}));

globalThis.fetch = vi.fn();

describe('CiviCrmFunnel Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <CiviCrmFunnel />
      </MemoryRouter>
    );

  it('renders hero and value sections', () => {
    renderComponent();

    expect(screen.getByText('civiFunnelBcn.hero.title')).toBeInTheDocument();
    expect(screen.getByText('civiFunnelBcn.value.socios.title')).toBeInTheDocument();
    expect(screen.getByText('civiFunnelBcn.value.pagos.title')).toBeInTheDocument();
    expect(screen.getByText('civiFunnelBcn.value.fiscal.title')).toBeInTheDocument();
  });

  it('renders contact form fields including name and email', () => {
    renderComponent();

    expect(screen.getByLabelText('civiFunnelBcn.form.foundationName')).toBeInTheDocument();
    expect(screen.getByLabelText('Persona de Contacto')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('civiFunnelBcn.form.phone')).toBeInTheDocument();
    expect(screen.getByLabelText('civiFunnelBcn.form.problem')).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('civiFunnelBcn.form.foundationName'), {
      target: { value: 'Fundación Solidaria' }
    });
    fireEvent.change(screen.getByLabelText('Persona de Contacto'), {
      target: { value: 'Laura García' }
    });
    fireEvent.change(screen.getByLabelText('Correo Electrónico'), {
      target: { value: 'laura@fundacion.org' }
    });
    fireEvent.change(screen.getByLabelText('civiFunnelBcn.form.phone'), {
      target: { value: '+34 600 000 000' }
    });
    fireEvent.change(screen.getByLabelText('civiFunnelBcn.form.problem'), {
      target: { value: 'Necesitamos automatizar el Modelo 182 y cuotas SEPA' }
    });

    const submitBtn = screen.getByRole('button', { name: 'civiFunnelBcn.form.submit' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('civiFunnelBcn.form.success')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('calls useSeo with expected parameters', () => {
    renderComponent();

    expect(useSeo).toHaveBeenCalledWith(
      'Integración CiviCRM para Fundaciones en Barcelona - SmallPush',
      'Centraliza la gestión de socios, donativos y modelos fiscales de tu fundación con CiviCRM.',
      expect.objectContaining({
        image: '/logo.png',
        keywords: 'CiviCRM, fundaciones, Barcelona, tercer sector, CRM, modelo 182, donativos'
      })
    );
  });
});
