import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCaptcha from './useCaptcha';

describe('useCaptcha', () => {
    it('initializes and generates a captcha correctly', () => {
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

    it('can set captcha verified state', () => {
        const { result } = renderHook(() => useCaptcha());

        act(() => {
            result.current.setCaptchaVerified(true);
        });

        expect(result.current.captchaVerified).toBe(true);
    });

    it('generates a new captcha on demand', () => {
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
