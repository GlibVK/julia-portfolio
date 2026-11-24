import type { CSSProperties } from 'react';
import type { ProjectCover as Cover } from '../../data/site';
import { photoSources } from '../../data/portfolioPhotos';
import './ProjectCover.css';

type ProjectCoverProps = {
  cover: Cover;
  /** `sizes` for photo covers: how wide the tile is drawn, so the browser picks 1x or 2x. */
  sizes: string;
  className?: string;
};

/**
 * Project card picture in the demo's tile shape (393:368 = 615:576), shared by the home Works
 * row and the portfolio page grid. Decorative (alt=""): the card's title names the link.
 */
export function ProjectCover({ cover, sizes, className }: ProjectCoverProps) {
  const classes = className ? `project-cover ${className}` : 'project-cover';

  if (cover.kind === 'art') {
    const style = {
      '--art-left': cover.box.left,
      '--art-top': cover.box.top,
      '--art-width': cover.box.width,
      '--card-bg': cover.background,
    } as CSSProperties;
    return (
      <span className={classes} style={style}>
        <img className="project-cover__img project-cover__img--art" src={cover.image} alt="" loading="lazy" decoding="async" />
      </span>
    );
  }

  const sources = photoSources(cover.photo);
  return (
    <span className={classes}>
      <picture>
        <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
        <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
        <img
          className="project-cover__img project-cover__img--photo"
          src={sources.fallback}
          srcSet={sources.jpg}
          sizes={sizes}
          alt=""
          width={615}
          height={576}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </span>
  );
}
