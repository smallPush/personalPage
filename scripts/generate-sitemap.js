import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { notices } from '../src/data/notices.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://smallpush.org';
const PUBLIC_DIR = path.join(__dirname, '../public');

// Define static routes
const staticRoutes = [
  '/',
  '/news'
];

// Generate dynamic routes from notices
const dynamicRoutes = notices.map(notice => `/news/${notice.id}`);

// Combine all routes
const routes = [...staticRoutes, ...dynamicRoutes];

// Generate XML content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${BASE_URL}/#${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
`).join('')}
</urlset>`;

// Ensure public directory exists (it should, but good practice)
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Write sitemap.xml
const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapContent);

console.log(`Sitemap generated successfully at ${sitemapPath}`);
console.log(`Total URLs: ${routes.length}`);
