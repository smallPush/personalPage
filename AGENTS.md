# AGENTS.md

## Repo At A Glance
- Vite + React SPA, routed with `HashRouter` (`src/main.jsx`), so route URLs use `/#/...` instead of path-based routing.
- Main app wiring is in `src/App.jsx` (routes for `/`, `/news`, `/news/:id`, `/donor-funnel`).
- `README.md` is boilerplate from Vite; rely on scripts/config as source of truth.

## Commands That Matter
- Install: `npm ci`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Tests (all): `npm run test` (Vitest + jsdom)
- Single test file: `npx vitest run src/path/to/file.test.jsx`
- Regenerate sitemap after changing notices/routes: `npm run sitemap`

## Testing / Tooling Quirks
- Vitest setup file is `src/setupTests.js` (configured in `vite.config.js`).
- There is also `src/test/setup.js`, but it is not referenced by Vitest config.
- Some tests stub Vite env vars (`vi.stubEnv(...)`), so keep env-dependent logic in `import.meta.env` form.

## Content + Routing Gotchas
- News content is metadata + markdown:
  - Metadata: `src/data/notices.js`
  - Markdown bodies: `public/notices/*.md`
- Notices loader in `src/components/Notices.jsx` uses `import.meta.glob('/public/notices/*.md', { eager: true })` and locale prefixes (`es_`, `ca_`) with fallback to base file.
- Keep `notices.js` IDs/filenames aligned with markdown filenames, or posts/sitemap routes will break.
- Sitemap generator (`scripts/generate-sitemap.js`) builds URLs as `https://smallpush.org/#...` from `notices.js` IDs.

## Environment + Deploy Facts
- Contact form send path requires `VITE_TELEGRAM_BOT_TOKEN` and `VITE_TELEGRAM_CHAT_ID` (`src/hooks/useContactSubmit.js`).
- Analytics tag in `index.html` uses `%VITE_GA_MEASUREMENT_ID%`.
- GitHub Pages deploy workflow is `.github/workflows/deploy.yml`; it runs on tag pushes (`'*'`) and manual dispatch, then builds and deploys `dist/`.
