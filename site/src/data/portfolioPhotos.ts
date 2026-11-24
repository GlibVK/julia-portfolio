// Portfolio photo tiles written by `npm run images` (scripts/optimize-images.mjs) into
// images/portfolio/optimized/<name>-<width>.<avif|webp|jpg>. Vite turns every file into a URL;
// `photoSources('<name>')` groups them into srcsets for a <picture>.

const files = import.meta.glob<string>('../../../images/portfolio/optimized/*.{avif,webp,jpg}', {
  eager: true,
  // no-inline: small tiles stay files too, instead of base64 inside the shared JS chunk.
  query: '?url&no-inline',
  import: 'default',
});

type Format = 'avif' | 'webp' | 'jpg';

type PhotoSources = {
  avif: string;
  webp: string;
  jpg: string;
  /** Smallest JPEG, for the <img> fallback. */
  fallback: string;
};

const byName = new Map<string, Record<Format, { width: number; url: string }[]>>();

for (const [path, url] of Object.entries(files)) {
  const match = /\/([^/]+)-(\d+)\.(avif|webp|jpg)$/.exec(path);
  if (!match) continue;
  const [, name, width, format] = match;
  const entry = byName.get(name) ?? { avif: [], webp: [], jpg: [] };
  entry[format as Format].push({ width: Number(width), url });
  byName.set(name, entry);
}

const srcset = (list: { width: number; url: string }[]) =>
  [...list]
    .sort((a, b) => a.width - b.width)
    .map(({ width, url }) => `${url} ${width}w`)
    .join(', ');

/** Srcsets of one photo; throws during the build if `npm run images` was not run for it. */
export function photoSources(name: string): PhotoSources {
  const entry = byName.get(name);
  if (!entry || entry.jpg.length === 0) {
    throw new Error(`Portfolio photo "${name}" not found: put it in images/portfolio/source/ and run npm run images`);
  }
  const smallestJpg = [...entry.jpg].sort((a, b) => a.width - b.width)[0];
  return { avif: srcset(entry.avif), webp: srcset(entry.webp), jpg: srcset(entry.jpg), fallback: smallestJpg.url };
}
