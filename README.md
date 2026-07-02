# SmallPush Personal Page

Vite + React single-page application for the SmallPush website.

## Setup

Install dependencies with:

```bash
npm ci
```

Start the development server with:

```bash
npm run dev
```

## Tests

Run the full Vitest suite with:

```bash
npm run test
```

Run a single test file with:

```bash
npx vitest run src/path/to/file.test.jsx
```

Examples:

```bash
npx vitest run src/components/ContactForm.test.jsx
npx vitest run src/hooks/useContactSubmit.test.js
```

## Other Checks

Run ESLint with:

```bash
npm run lint
```

Build the production bundle with:

```bash
npm run build
```

The build command regenerates `public/sitemap.xml` before running Vite.
