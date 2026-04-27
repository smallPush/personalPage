import React from 'react';
import { render, screen, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Notices from './Notices';
import { notices as _notices } from '../data/notices';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => fallback || key,
    i18n: { changeLanguage: vi.fn(), language: 'en' }
  }),
}));

vi.mock('../utils/useSeo', () => ({
  default: vi.fn(),
}));

describe('Notices Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const renderNotices = (props = {}) => {
    return render(
      <MemoryRouter>
        <Notices {...props} />
      </MemoryRouter>
    );
  };

  it('renders notices list title', async () => {
    await act(async () => {
      renderNotices();
    });
    expect(screen.getByText('News')).toBeInTheDocument();
  });

  it('renders notices tags', async () => {
    await act(async () => {
      renderNotices();
    });
    const aiTags = screen.getAllByText('AI');
    expect(aiTags.length).toBeGreaterThan(0);
    expect(aiTags[0]).toBeInTheDocument();
  });

  it('can filter by tag', async () => {
    await act(async () => {
      renderNotices();
    });

    const filterInput = screen.getByPlaceholderText('Search tags...');
    await act(async () => {
      fireEvent.change(filterInput, { target: { value: 'AI' } });
    });

    expect(screen.getAllByText('AI').length).toBeGreaterThan(0);

    const clearButton = screen.getByRole('button', { name: 'Clear filter' });
    expect(clearButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(clearButton);
    });
    expect(filterInput.value).toBe('');
  });

  it('can select a tag to filter notices', async () => {
    await act(async () => {
      renderNotices();
    });

    const filterTags = screen.getAllByText('AI');
    const filterTag = filterTags[0];

    await act(async () => {
      fireEvent.click(filterTag);
    });

    const clearFilterLink = screen.getByText('Clear');
    expect(clearFilterLink).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(clearFilterLink);
    });

    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  it('renders a specific single notice when singleNoticeId is provided', async () => {
    await act(async () => {
      renderNotices({ singleNoticeId: 'welcome' });
    });

    expect(screen.getByText('News Item')).toBeInTheDocument();
    expect(screen.getByText('Back to News')).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByText('Loading content...')).not.toBeInTheDocument();
    });
  });
});
