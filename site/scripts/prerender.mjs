// Build step after `vite build` and the SSR build (see "build" in package.json).
// Puts the rendered page into dist/index.html, so search engines and link previews get the
// real content without running JavaScript.
//
// Optional: set SITE_URL to the live address to also get canonical / og:url, an absolute
// og:image, the Person "url" and sitemap.xml, e.g. in PowerShell:
//   $env:SITE_URL = 'https://example.com'; npm run build
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = (path) => fileURLToPath(new URL(path, import.meta.url));
const dist = here('../dist/');
const serverEntry = pathToFileURL(here('../dist-server/entry-server.js')).href;

const { render } = await import(serverEntry);
let html = await readFile(`${dist}index.html`, 'utf8');

const appHtml = render();
if (!html.includes('<div id="root"></div>')) throw new Error('#root placeholder not found in dist/index.html');
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

const siteUrl = process.env.SITE_URL?.replace(/\/+$/, '');
if (siteUrl) {
  const home = `${siteUrl}/`;
  html = html
    .replace('<meta property="og:image" content="/', `<meta property="og:image" content="${siteUrl}/`)
    .replace(
      '<meta property="og:type"',
      `<link rel="canonical" href="${home}" />\n    <meta property="og:url" content="${home}" />\n    <meta property="og:type"`,
    )
    .replace('"@type": "Person",', `"@type": "Person",\n        "url": "${home}",`);

  const today = new Date().toISOString().slice(0, 10);
  await writeFile(
    `${dist}sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${home}</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
  );
  const robots = await readFile(`${dist}robots.txt`, 'utf8');
  await writeFile(`${dist}robots.txt`, `${robots.trimEnd()}\nSitemap: ${siteUrl}/sitemap.xml\n`);
}

await writeFile(`${dist}index.html`, html);
console.log(`Prerendered dist/index.html (${Math.round(appHtml.length / 1024)} KB of markup)${siteUrl ? ` for ${siteUrl}` : ''}`);
