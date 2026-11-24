// Build step after `vite build` and the SSR build (see "build" in package.json).
// Puts each rendered page into its HTML file (dist/index.html, dist/portfolio/index.html), so
// search engines and link previews get the real content without running JavaScript.
//
// Optional: set SITE_URL to the live address of the site's root (with the sub-path on GitHub
// Pages) to also get canonical / og:url, an absolute og:image, the Person "url" and
// sitemap.xml, e.g. in PowerShell:
//   $env:SITE_URL = 'https://example.com'; npm run build
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = (path) => fileURLToPath(new URL(path, import.meta.url));
const dist = here('../dist/');
const serverEntry = pathToFileURL(here('../dist-server/entry-server.js')).href;

/** Pages of the site: render() name, HTML file in dist/, URL path from the site root. Keep in sync with vite.config.ts. */
const pages = [
  { name: 'home', file: 'index.html', path: '/' },
  { name: 'portfolio', file: 'portfolio/index.html', path: '/portfolio/' },
];

const { render } = await import(serverEntry);
const siteUrl = process.env.SITE_URL?.replace(/\/+$/, '');
// og:image is already a root-absolute path with the base ("/<repository>/og-image.jpg"): add the origin only.
const siteOrigin = siteUrl ? new URL(siteUrl).origin : '';

for (const page of pages) {
  let html = await readFile(`${dist}${page.file}`, 'utf8');

  const appHtml = render(page.name);
  if (!html.includes('<div id="root"></div>')) throw new Error(`#root placeholder not found in dist/${page.file}`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  if (siteUrl) {
    const url = `${siteUrl}${page.path}`;
    html = html
      .replace('<meta property="og:image" content="/', `<meta property="og:image" content="${siteOrigin}/`)
      .replace(
        '<meta property="og:type"',
        `<link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n    <meta property="og:type"`,
      )
      .replace('"@type": "Person",', `"@type": "Person",\n        "url": "${siteUrl}/",`);
  }

  await writeFile(`${dist}${page.file}`, html);
  console.log(`Prerendered dist/${page.file} (${Math.round(appHtml.length / 1024)} KB of markup)${siteUrl ? ` for ${siteUrl}` : ''}`);
}

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages.map((page) => `  <url><loc>${siteUrl}${page.path}</loc><lastmod>${today}</lastmod></url>`);
  await writeFile(
    `${dist}sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  );
  const robots = await readFile(`${dist}robots.txt`, 'utf8');
  await writeFile(`${dist}robots.txt`, `${robots.trimEnd()}\nSitemap: ${siteUrl}/sitemap.xml\n`);
}
