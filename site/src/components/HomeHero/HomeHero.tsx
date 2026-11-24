import portraitAvif423 from '@figma/02-home-hero/optimized/julia-portrait-423.avif';
import portraitAvif846 from '@figma/02-home-hero/optimized/julia-portrait-846.avif';
import portraitWebp423 from '@figma/02-home-hero/optimized/julia-portrait-423.webp';
import portraitWebp846 from '@figma/02-home-hero/optimized/julia-portrait-846.webp';
import portraitPng423 from '@figma/02-home-hero/optimized/julia-portrait-423.png';
import portraitPng846 from '@figma/02-home-hero/optimized/julia-portrait-846.png';
import { allWorksLink, services } from '../../data/site';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { Reveal } from '../Reveal/Reveal';
import { Services } from '../Services/Services';
import { SplitText } from '../SplitText/SplitText';
import './HomeHero.css';

/**
 * Drawn portrait width: up to ~414px on desktop; in the stacked layout the image box is
 * min(100vw - 96px, 596px) and the portrait is ~0.71 of it (up to ~420px).
 */
const PORTRAIT_SIZES = '(max-width: 991.98px) min(71vw, 420px), 423px';

/**
 * Home hero (Figma 1:130): portrait on the yellow rounded diamond, role label and the name.
 * Positions are absolute Figma coordinates; see HomeHero.css.
 */
export function HomeHero() {
  return (
    <div className="hero">
      {/* Figma 1:178 "pic". hero__media is the demo's image box in the stacked layout;
          on desktop it has display: contents (no box of its own). */}
      <div className="hero__media">
        <Reveal effect="fade-right" className="hero__pic">
          <div className="hero__shape" aria-hidden="true" />
          <div className="hero__mask">
            {/* AVIF / WebP / PNG at 1x and 2x (scripts/optimize-images.mjs); the browser picks one. */}
            <picture>
              <source type="image/avif" srcSet={`${portraitAvif423} 423w, ${portraitAvif846} 846w`} sizes={PORTRAIT_SIZES} />
              <source type="image/webp" srcSet={`${portraitWebp423} 423w, ${portraitWebp846} 846w`} sizes={PORTRAIT_SIZES} />
              <img
                className="hero__portrait"
                src={portraitPng846}
                srcSet={`${portraitPng423} 423w, ${portraitPng846} 846w`}
                sizes={PORTRAIT_SIZES}
                width={423}
                height={770}
                alt="Julia Stiles smiling, in a white T-shirt and jeans"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </Reveal>
      </div>

      {/* Figma 1:177 + 1:139 */}
      <Reveal effect="fade-in" className="hero__text">
        <p className="hero__role">Designer / developer</p>
        <SplitText as="h1" className="hero__name" text="Julia Stiles" />
      </Reveal>

      {/* Figma 1:162, 1:166, 1:170 */}
      <Services items={services} className="hero__services" />

      {/* Figma 1:140; placed in the services row as in the demo (user request) */}
      <Reveal className="hero__cta" delay={300}>
        <ButtonLink href={allWorksLink.href} className="hero__button">
          {allWorksLink.label}
        </ButtonLink>
      </Reveal>
    </div>
  );
}
