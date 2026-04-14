import { useState, useCallback } from 'react';

const useCaptcha = () => {
    const [captcha, setCaptcha] = useState({ options: [], correctIndex: -1 });
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const generateCaptcha = useCallback(() => {
        const getSecureRandom = () => {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] / (0xffffffff + 1);
        };

        const emojis = ['🚀', '🌟', '🌙', '⚡', '🔥', '💎', '🎈', '🍕', '🐱', '🌵', '🌺', '🎸'];
        const mainEmojiIndex = Math.floor(getSecureRandom() * emojis.length);
        const diffEmojiIndex = (mainEmojiIndex + 1 + Math.floor(getSecureRandom() * (emojis.length - 1))) % emojis.length;

        const mainEmoji = emojis[mainEmojiIndex];
        const diffEmoji = emojis[diffEmojiIndex];
        const correctIndex = Math.floor(getSecureRandom() * 5);
        const options = Array(5).fill(mainEmoji);
        options[correctIndex] = diffEmoji;

        setCaptcha({ options, correctIndex });
        setCaptchaVerified(false);
    }, []);

    return {
        captcha,
        captchaVerified,
        setCaptchaVerified,
        generateCaptcha
    };
};

export default useCaptcha;
