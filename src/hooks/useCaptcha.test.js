import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useCaptcha from './useCaptcha';

describe('useCaptcha', () => {
    let originalGetRandomValues;

    beforeEach(() => {
        originalGetRandomValues = window.crypto.getRandomValues;
        window.crypto.getRandomValues = vi.fn();
    });

    afterEach(() => {
        window.crypto.getRandomValues = originalGetRandomValues;
    });

    it('initializes and generates a captcha correctly', () => {
        const maxUint32 = 0xffffffff + 1;
        window.crypto.getRandomValues.mockImplementation((arr) => {
            arr[0] = Math.floor(Math.random() * maxUint32);
        });

        const { result } = renderHook(() => useCaptcha());

        // Verify initial states
        expect(result.current.captchaVerified).toBe(false);

        // the captcha options are now only generated upon calling `generateCaptcha` initially
        // since useEffect in hook was removed.
        act(() => {
            result.current.generateCaptcha();
        });

        expect(result.current.captcha.options.length).toBe(5);
        expect(result.current.captcha.correctIndex).toBeGreaterThanOrEqual(0);
        expect(result.current.captcha.correctIndex).toBeLessThan(5);

        // Verify that there is exactly one correct option and 4 incorrect options
        const correctEmoji = result.current.captcha.options[result.current.captcha.correctIndex];
        const correctOptionsCount = result.current.captcha.options.filter(opt => opt === correctEmoji).length;
        expect(correctOptionsCount).toBe(1);

        const incorrectOptionsCount = result.current.captcha.options.filter(opt => opt !== correctEmoji).length;
        expect(incorrectOptionsCount).toBe(4);
    });

    it('generates predictable captcha based on mocked random values', () => {
        let callCount = 0;
        const maxUint32 = 0xffffffff + 1;

        window.crypto.getRandomValues.mockImplementation((arr) => {
            if (callCount === 0) arr[0] = Math.floor(0.5 * maxUint32); // mainEmojiIndex -> index 6 ('🎈')
            else if (callCount === 1) arr[0] = Math.floor(0.2 * maxUint32); // diffEmoji offset -> index = (6 + 1 + Math.floor(0.2 * 11)) % 12 = (7 + 2) % 12 = 9 ('🌵')
            else if (callCount === 2) arr[0] = Math.floor(0.9 * maxUint32); // correctIndex -> Math.floor(0.9 * 5) = 4
            callCount++;
        });

        const { result } = renderHook(() => useCaptcha());
        act(() => { result.current.generateCaptcha(); });

        expect(callCount).toBe(3);
        expect(result.current.captcha.correctIndex).toBe(4);

        const options = result.current.captcha.options;
        expect(options[4]).toBe('🌵'); // Diff emoji
        expect(options[0]).toBe('🎈'); // Main emoji
        expect(options[1]).toBe('🎈');
        expect(options[2]).toBe('🎈');
        expect(options[3]).toBe('🎈');
    });

    it('can set captcha verified state', () => {
        const { result } = renderHook(() => useCaptcha());

        act(() => {
            result.current.setCaptchaVerified(true);
        });

        expect(result.current.captchaVerified).toBe(true);
    });

    it('generates a new captcha on demand', () => {
        const maxUint32 = 0xffffffff + 1;
        window.crypto.getRandomValues.mockImplementation((arr) => {
            arr[0] = Math.floor(Math.random() * maxUint32);
        });

        const { result } = renderHook(() => useCaptcha());

        act(() => {
            result.current.generateCaptcha();
        });

        // Verify captcha Verified is reset to false when regenerating
        act(() => {
            result.current.setCaptchaVerified(true);
        });

        expect(result.current.captchaVerified).toBe(true);

        act(() => {
            result.current.generateCaptcha();
        });

        // The options or correct index MIGHT be the same due to randomness,
        // but verifying the verified state reset is deterministic.
        expect(result.current.captchaVerified).toBe(false);
        expect(result.current.captcha.options.length).toBe(5);
        expect(result.current.captcha.correctIndex).toBeGreaterThanOrEqual(0);
        expect(result.current.captcha.correctIndex).toBeLessThan(5);
    });
});
