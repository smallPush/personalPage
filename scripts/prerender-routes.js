/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { notices } from '../src/data/notices.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://smallpush.org';
const DIST_DIR = path.join(__dirname, '../dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf8');

const staticRouteMeta = {
  '/': {
    title: 'SmallPush | Consultoría CiviCRM, Donaciones y Automatización para ONGs y Fundaciones',
    description: 'Especialistas en CiviCRM, pasarelas de pago (Redsys, Bizum, Stripe, SEPA) y automatización del Modelo 182 para entidades del Tercer Sector.',
    keywords: 'CiviCRM España, CiviCRM Redsys, CiviCRM Bizum, Modelo 182, donaciones recurrentes, CRM para ONG, Drupal fundaciones'
  },
  '/donor-funnel': {
    title: 'Embudo de Donantes con IA | Captación para ONGs y Fundaciones - SmallPush',
    description: 'Automatiza la captación y fidelización de donantes para tu ONG o fundación con IA conversacional, LangChain y CiviCRM.',
    keywords: 'donaciones, donor funnel, captación socios, CRM para ONG, CiviCRM, LangChain, automatización donantes'
  },
  '/event-funnel': {
    title: 'Funnel de Eventos para ONGs y Fundaciones | Registro y Pagos - SmallPush',
    description: 'Landing de eventos, registro de inscripciones, control de asistencia (check-in) y cobros integrados con CiviCRM (Redsys, Bizum, Stripe).',
    keywords: 'eventos ONG, registro eventos, ticketing fundaciones, pasarela donaciones, CiviCRM eventos'
  },
  '/fundaciones-barcelona': {
    title: 'Consultoría CiviCRM para Fundaciones en Barcelona y Cataluña - SmallPush',
    description: 'Centraliza la gestión de socios, automatiza remesas SEPA, certificados de donación y presentación del Modelo 182 de Hacienda para tu fundación.',
    keywords: 'CiviCRM Barcelona, fundaciones Barcelona, CRM fundaciones Cataluña, modelo 182, donativos, tercer sector'
  },
  '/news': {
    title: 'Guías y Tutoriales: CiviCRM, Modelo 182, Donaciones y Drupal - SmallPush',
    description: 'Artículos técnicos y guías prácticas sobre CiviCRM, integraciones de pago, automatización fiscal para ONGs y desarrollo de software.',
    keywords: 'CiviCRM tutoriales, guías CiviCRM, modelo 182, pagos Redsys CiviCRM, Drupal ONG'
  }
};

const escapeHtml = (str = '') =>
  str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function generateHtmlForRoute(route, meta, noticeData = null) {
  let html = baseHtml;
  const fullUrl = route === '/' ? BASE_URL : `${BASE_URL}${route}`;
  const title = meta.title;
  const description = meta.description;
  const keywords = meta.keywords;
  const imageUrl = meta.image || `${BASE_URL}/logo.png`;

  // Update Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // Update or insert canonical
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${fullUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${fullUrl}" />\n</head>`);
  }

  // Update Meta Description
  html = html.replace(
    /<meta name="description"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // Update Meta Keywords
  html = html.replace(
    /<meta name="keywords"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta name="keywords" content="${escapeHtml(keywords)}" />`
  );

  // Update Open Graph
  html = html.replace(
    /<meta property="og:title"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta property="og:description"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta property="og:url"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta property="og:image"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:image" content="${imageUrl}" />`
  );

  // Update Twitter Cards
  html = html.replace(
    /<meta property="twitter:title"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta property="twitter:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta property="twitter:description"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta property="twitter:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta property="twitter:url"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta property="twitter:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta property="twitter:image"[\s\S]*?content="[\s\S]*?"\s*\/?>/i,
    `<meta property="twitter:image" content="${imageUrl}" />`
  );

  // If this is a specific notice / article, inject Article JSON-LD
  if (noticeData) {
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": imageUrl,
      "datePublished": noticeData.date,
      "author": {
        "@type": "Person",
        "name": "Ruben",
        "url": BASE_URL
      },
      "publisher": {
        "@type": "Organization",
        "name": "SmallPush",
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullUrl
      }
    };

    const schemaSnippet = `\n  <script type="application/ld+json">\n${JSON.stringify(articleLd, null, 2)}\n  </script>`;
    html = html.replace('</head>', `${schemaSnippet}\n</head>`);
  }

  // Remove SPA redirect script on prerendered pages so they don't loop or redirect
  // when loaded directly from their respective subfolder
  if (route !== '/') {
    html = html.replace(/<script type="text\/javascript">\s*\/\/ Single Page Apps for GitHub Pages[\s\S]*?<\/script>/i, '');
  }

  return html;
}

// Generate static routes
for (const [route, meta] of Object.entries(staticRouteMeta)) {
  if (route === '/') {
    const homeHtml = generateHtmlForRoute('/', meta);
    fs.writeFileSync(templatePath, homeHtml);
    console.log('✓ Prerendered / (index.html)');
    continue;
  }

  const targetDir = path.join(DIST_DIR, route.replace(/^\//, ''));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const filePath = path.join(targetDir, 'index.html');
  fs.writeFileSync(filePath, generateHtmlForRoute(route, meta));
  console.log(`✓ Prerendered ${route} -> ${filePath.replace(DIST_DIR, '')}`);
}

// Generate dynamic notice routes
for (const notice of notices) {
  const route = `/news/${notice.id}`;
  const meta = {
    title: notice.seoTitle?.es || notice.seoTitle?.en || `${notice.id} - SmallPush`,
    description: notice.seoDescription?.es || notice.seoDescription?.en || '',
    keywords: notice.keywords?.es || notice.keywords?.en || '',
    image: `${BASE_URL}/logo.png`
  };

  const targetDir = path.join(DIST_DIR, 'news', notice.id);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const filePath = path.join(targetDir, 'index.html');
  fs.writeFileSync(filePath, generateHtmlForRoute(route, meta, notice));
  console.log(`✓ Prerendered ${route} -> ${filePath.replace(DIST_DIR, '')}`);
}

console.log('All routes prerendered successfully for GitHub Pages SEO (HTTP 200).');
