import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useContactSubmit = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitContactForm = async (formData, captchaVerified, onSuccess) => {
        setStatus({ type: '', msg: '' });

        if (!captchaVerified) {
            setStatus({ type: 'danger', msg: t('contact.captcha.error') });
            return;
        }

        setIsSubmitting(true);

        try {
            const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
            const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

            if (!botToken || !chatId) {
                setStatus({ type: 'danger', msg: t('contact.error') });
                setIsSubmitting(false);
                return;
            }

            const text = `📬 *New Contact Form Submission*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n\n*Message:*\n${formData.message}`;

            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                setStatus({ type: 'success', msg: t('contact.success') });
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                setStatus({ type: 'danger', msg: t('contact.error') });
            }
        } catch {
            setStatus({ type: 'danger', msg: t('contact.error') });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        status,
        setStatus,
        isSubmitting,
        submitContactForm
    };
};

export default useContactSubmit;
