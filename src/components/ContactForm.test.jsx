import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactForm from './ContactForm';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock fetch
globalThis.fetch = vi.fn();

const fillRequiredFields = () => {
  const nameInput = screen.getByPlaceholderText('John Doe');
  const emailInput = screen.getByPlaceholderText('john@example.com');
  const messageInput = screen.getAllByRole('textbox').find(el => el.tagName === 'TEXTAREA');

  fireEvent.change(nameInput, { target: { value: 'Test User' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(messageInput, { target: { value: 'This is a test message' } });

  return { nameInput, emailInput, messageInput };
};

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', 'test-bot-token');
    vi.stubEnv('VITE_TELEGRAM_CHAT_ID', 'test-chat-id');
  });

  it('renders correctly', () => {
    render(<ContactForm />);

    expect(screen.getByText('contact.title')).toBeInTheDocument();
    expect(screen.getByText('contact.name')).toBeInTheDocument();
    expect(screen.getByText('contact.email')).toBeInTheDocument();
    expect(screen.getByText('contact.message')).toBeInTheDocument();
    expect(screen.queryByText('contact.captcha.question')).not.toBeInTheDocument();
    expect(screen.getByText('contact.submit')).toBeInTheDocument();
  });

  it('reveals the captcha on submit before requiring it', async () => {
    render(<ContactForm />);

    fillRequiredFields();
    const submitBtn = screen.getByText('contact.submit');

    fireEvent.click(submitBtn);

    expect(screen.getByText('contact.captcha.question')).toBeInTheDocument();
    expect(screen.queryByText('contact.captcha.error')).not.toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();

    fireEvent.click(submitBtn);
    expect(await screen.findByText('contact.captcha.error')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows error on incorrect captcha click and resets captcha', async () => {
    render(<ContactForm />);

    fillRequiredFields();
    fireEvent.click(screen.getByText('contact.submit'));

    // Find the captcha buttons
    const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== 'contact.submit');

    // Find the emoji that appears most often (the wrong one)
    const counts = {};
    buttons.forEach(btn => {
      counts[btn.textContent] = (counts[btn.textContent] || 0) + 1;
    });

    const wrongEmoji = Object.keys(counts).find(key => counts[key] > 1);
    const wrongButton = buttons.find(btn => btn.textContent === wrongEmoji);

    fireEvent.click(wrongButton);

    expect(await screen.findByText('contact.captcha.error')).toBeInTheDocument();
  });

  it('allows submission after solving captcha correctly', async () => {
    // Setup successful fetch mock
    fetch.mockResolvedValueOnce({ ok: true });

    render(<ContactForm />);

    // Mock HTML5 form validation so form submits without actual user input typing since jsdom might be strict
    const form = document.querySelector('form');
    form.checkValidity = () => true;

    const { nameInput, emailInput, messageInput } = fillRequiredFields();
    const submitBtn = screen.getByText('contact.submit');
    fireEvent.click(submitBtn);

    // Solve captcha
    const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== 'contact.submit' && btn.textContent !== 'Close alert');

    // Find the unique emoji (the correct one)
    const counts = {};
    buttons.forEach(btn => {
      counts[btn.textContent] = (counts[btn.textContent] || 0) + 1;
    });

    const correctEmoji = Object.keys(counts).find(key => counts[key] === 1);
    const correctButton = buttons.find(btn => btn.textContent === correctEmoji);

    fireEvent.click(correctButton);

    // Submit form
    fireEvent.click(submitBtn);

    // Verify fetch was called correctly
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(fetch).toHaveBeenCalledWith('https://api.telegram.org/bottest-bot-token/sendMessage', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: 'test-chat-id',
        text: '📬 *New Contact Form Submission*\n\n*Name:* Test User\n*Email:* test@example.com\n\n*Message:*\nThis is a test message',
        parse_mode: 'Markdown'
      })
    }));

    // Check for success message
    expect(await screen.findByText('contact.success')).toBeInTheDocument();

    // Check if form was reset
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });

  it('shows error when fetch fails', async () => {
    // Setup failed fetch mock
    fetch.mockResolvedValueOnce({ ok: false });

    render(<ContactForm />);

    const form = document.querySelector('form');
    form.checkValidity = () => true;

    fillRequiredFields();
    const submitBtn = screen.getByText('contact.submit');
    fireEvent.click(submitBtn);

    // Solve captcha
    const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== 'contact.submit' && btn.textContent !== 'Close alert');
    const counts = {};
    buttons.forEach(btn => {
      counts[btn.textContent] = (counts[btn.textContent] || 0) + 1;
    });
    const correctEmoji = Object.keys(counts).find(key => counts[key] === 1);
    const correctButton = buttons.find(btn => btn.textContent === correctEmoji);

    fireEvent.click(correctButton);

    // Submit form
    fireEvent.click(submitBtn);

    // Check for error message
    expect(await screen.findByText('contact.error')).toBeInTheDocument();
  });

  it('shows error when fetch throws an exception', async () => {
    // Setup rejected fetch mock
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<ContactForm />);

    const form = document.querySelector('form');
    form.checkValidity = () => true;

    fillRequiredFields();
    const submitBtn = screen.getByText('contact.submit');
    fireEvent.click(submitBtn);

    // Solve captcha
    const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== 'contact.submit' && btn.textContent !== 'Close alert');
    const counts = {};
    buttons.forEach(btn => {
      counts[btn.textContent] = (counts[btn.textContent] || 0) + 1;
    });
    const correctEmoji = Object.keys(counts).find(key => counts[key] === 1);
    const correctButton = buttons.find(btn => btn.textContent === correctEmoji);

    fireEvent.click(correctButton);

    // Submit form
    fireEvent.click(submitBtn);

    // Check for error message
    expect(await screen.findByText('contact.error')).toBeInTheDocument();
  });

  it('shows error when env variables are missing', async () => {
    vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', '');
    vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '');

    render(<ContactForm />);

    const form = document.querySelector('form');
    form.checkValidity = () => true;

    fillRequiredFields();
    const submitBtn = screen.getByText('contact.submit');
    fireEvent.click(submitBtn);

    // Solve captcha
    const buttons = screen.getAllByRole('button').filter(btn => btn.textContent !== 'contact.submit' && btn.textContent !== 'Close alert');
    const counts = {};
    buttons.forEach(btn => {
      counts[btn.textContent] = (counts[btn.textContent] || 0) + 1;
    });
    const correctEmoji = Object.keys(counts).find(key => counts[key] === 1);
    const correctButton = buttons.find(btn => btn.textContent === correctEmoji);

    fireEvent.click(correctButton);

    // Submit form
    fireEvent.click(submitBtn);

    // Check for error message
    expect(await screen.findByText('contact.error')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });
});
