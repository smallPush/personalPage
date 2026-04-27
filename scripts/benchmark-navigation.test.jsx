import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../src/components/Navigation';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { test } from 'vitest';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: { en: { translation: {} } },
});

test('benchmark', () => {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    const { unmount } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    unmount();
  }
  const end = performance.now();
  console.log(`Rendered 1000 times in ${end - start} ms`);
}, 10000);
