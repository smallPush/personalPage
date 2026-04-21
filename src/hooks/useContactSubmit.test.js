import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useContactSubmit from './useContactSubmit';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

// Mock fetch
globalThis.fetch = vi.fn();

describe('useContactSubmit', () => {
    const mockFormData = { name: 'John Doe', email: 'john@example.com', message: 'Hello' };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', 'test-bot-token');
        vi.stubEnv('VITE_TELEGRAM_CHAT_ID', 'test-chat-id');
    });

    it('initializes with default state', () => {
        const { result } = renderHook(() => useContactSubmit());

        expect(result.current.status).toEqual({ type: '', msg: '' });
        expect(result.current.isSubmitting).toBe(false);
    });

    it('sets error if captcha is not verified', async () => {
        const { result } = renderHook(() => useContactSubmit());

        await act(async () => {
            await result.current.submitContactForm(mockFormData, false);
        });

        expect(result.current.status).toEqual({ type: 'danger', msg: 'contact.captcha.error' });
        expect(fetch).not.toHaveBeenCalled();
    });

    it('submits successfully and calls onSuccess', async () => {
        fetch.mockResolvedValueOnce({ ok: true });
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useContactSubmit());

        await act(async () => {
            await result.current.submitContactForm(mockFormData, true, onSuccess);
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result.current.status).toEqual({ type: 'success', msg: 'contact.success' });
        expect(result.current.isSubmitting).toBe(false);
        expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it('submits successfully without onSuccess callback', async () => {
        fetch.mockResolvedValueOnce({ ok: true });

        const { result } = renderHook(() => useContactSubmit());

        await act(async () => {
            await result.current.submitContactForm(mockFormData, true);
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result.current.status).toEqual({ type: 'success', msg: 'contact.success' });
        expect(result.current.isSubmitting).toBe(false);
    });

    it('sets error on fetch failure', async () => {
        fetch.mockResolvedValueOnce({ ok: false });

        const { result } = renderHook(() => useContactSubmit());

        await act(async () => {
            await result.current.submitContactForm(mockFormData, true);
        });

        expect(result.current.status).toEqual({ type: 'danger', msg: 'contact.error' });
        expect(result.current.isSubmitting).toBe(false);
    });

    it('sets error on fetch exception', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useContactSubmit());

        await act(async () => {
            await result.current.submitContactForm(mockFormData, true);
        });

        expect(result.current.status).toEqual({ type: 'danger', msg: 'contact.error' });
        expect(result.current.isSubmitting).toBe(false);
    });

    it('sets error if environment variables are missing', async () => {
        vi.unstubAllEnvs();

        const { result } = renderHook(() => useContactSubmit());

        await act(async () => {
            await result.current.submitContactForm(mockFormData, true);
        });

        expect(result.current.status).toEqual({ type: 'danger', msg: 'contact.error' });
        expect(fetch).not.toHaveBeenCalled();
        expect(result.current.isSubmitting).toBe(false);
    });
});
