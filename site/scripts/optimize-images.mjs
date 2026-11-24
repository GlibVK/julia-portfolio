// One-off image optimisation. Run in site/: `npm run images`.
// Reads the original mockup assets (never changes them) and writes smaller copies:
// - the home portrait as AVIF / WebP / PNG at 1x and 2x of its displayed width (423px);
// - the 1200x630 link-preview image (og-image.jpg) into public/;
// - the portfolio photos (images/portfolio/source/) as AVIF / WebP / JPEG tiles.
import { mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

const portraitSrc = here('../../images/figma/02-home-hero/julia-portrait-original.png');
const outDir = here('../../images/figma/02-home-hero/optimized/');
const publicDir = here('../public/');

/** Displayed width of the portrait on desktop (Figma 1:182), px. */
const PORTRAIT_WIDTH = 423;

await mkdir(outDir, { recursive: true });

for (const scale of [1, 2]) {
  const width = PORTRAIT_WIDTH * scale;
  const base = sharp(portraitSrc).resize({ width });
  const name = `${outDir}julia-portrait-${width}`;
  await Promise.all([
    base.clone().avif({ quality: 60, effort: 6 }).toFile(`${name}.avif`),
    base.clone().webp({ quality: 82, effort: 6 }).toFile(`${name}.webp`),
    base.clone().png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`${name}.png`),
  ]);
}

// Link preview: the portrait on the hero's yellow diamond, on white, 1200x630.
const diamond = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect x="425" y="140" width="350" height="350" rx="90" transform="rotate(45 600 315)" fill="#ffcc1e"/>
</svg>`);
const portraitForOg = await sharp(portraitSrc).resize({ height: 600 }).toBuffer();
const ogPortraitWidth = (await sharp(portraitForOg).metadata()).width ?? 0;

await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([
    { input: diamond, top: 0, left: 0 },
    { input: portraitForOg, top: 30, left: Math.round(600 - ogPortraitWidth / 2) },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${publicDir}og-image.jpg`);

// Portfolio photos: every file in images/portfolio/source/ (add a project = drop its picture
// there, run `npm run images`, add an entry with `photo: '<file name without extension>'` to
// `projects` in src/data/site.ts). Tiles are at most ~300 CSS px wide, so 1x and 2x widths;
// the picture is cut to the demo's 615:576 tile shape.
const portfolioSrcDir = here('../../images/portfolio/source/');
const portfolioOutDir = here('../../images/portfolio/optimized/');
const TILE_WIDTHS = [308, 615];
const TILE_RATIO = 576 / 615;

await mkdir(portfolioOutDir, { recursive: true });
const photos = (await readdir(portfolioSrcDir)).filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file));

for (const file of photos) {
  const name = file.replace(/\.[^.]+$/, '');
  for (const width of TILE_WIDTHS) {
    const base = sharp(`${portfolioSrcDir}${file}`).resize({
      width,
      height: Math.round(width * TILE_RATIO),
      fit: 'cover',
    });
    const out = `${portfolioOutDir}${name}-${width}`;
    await Promise.all([
      base.clone().avif({ quality: 60, effort: 6 }).toFile(`${out}.avif`),
      base.clone().webp({ quality: 82, effort: 6 }).toFile(`${out}.webp`),
      base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}.jpg`),
    ]);
  }
}

console.log('Images written to', outDir, publicDir, `and ${portfolioOutDir} (${photos.length} portfolio photos)`);
