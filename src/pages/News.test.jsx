import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import News from './News';

vi.mock('../components/Notices', () => {
    return {
        default: ({ singleNoticeId }) => <div data-testid="mock-notices">{singleNoticeId}</div>
    };
});

describe('News Component', () => {
    let scrollToSpy;

    beforeEach(() => {
        scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders Notices with the correct singleNoticeId from URL params', () => {
        render(
            <MemoryRouter initialEntries={['/news/123']}>
                <Routes>
                    <Route path="/news/:id" element={<News />} />
                </Routes>
            </MemoryRouter>
        );

        const noticesMock = screen.getByTestId('mock-notices');
        expect(noticesMock).toHaveTextContent('123');
    });

    it('calls window.scrollTo(0, 0) on render', () => {
        render(
            <MemoryRouter initialEntries={['/news']}>
                <Routes>
                    <Route path="/news" element={<News />} />
                </Routes>
            </MemoryRouter>
        );

        expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });

    it('passes undefined when no id is provided in URL', () => {
        render(
            <MemoryRouter initialEntries={['/news']}>
                <Routes>
                    <Route path="/news" element={<News />} />
                </Routes>
            </MemoryRouter>
        );

        const noticesMock = screen.getByTestId('mock-notices');
        expect(noticesMock).toBeEmptyDOMElement();
    });
});
