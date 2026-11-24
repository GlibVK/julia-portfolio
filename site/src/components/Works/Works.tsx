import type { CSSProperties } from 'react';
import { projectCardId, projects, worksIntro } from '../../data/site';
import { useCarousel } from '../../hooks/useCarousel';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { Reveal } from '../Reveal/Reveal';
import { SplitText } from '../SplitText/SplitText';
import './Works.css';

/**
 * Works section = the live demo's "Portfolio" (section 04): header with the heading and a short
 * text, then a row of project cards. The cards come from the same `projects` list as the
 * sidebar "Portfolio" items; each card has the id the sidebar links to (`#project-<slug>`).
 * The row is a native scroll-snap scroller (swipe, trackpad, Shift+wheel, arrow keys) with
 * dots, as the demo's Swiper bullets, that appear only when not all cards fit.
 */
export function Works() {
  const { ref, count, index, goTo } = useCarousel<HTMLUListElement>();

  return (
    <div className="works">
      <Reveal className="works__header">
        <div className="works__title">
          <p className="works__eyebrow">{worksIntro.eyebrow}</p>
          <SplitText as="h2" className="works__heading" text={worksIntro.heading} />
        </div>
        <div className="works__aside">
          <p className="works__text">{worksIntro.text}</p>
          {/* Placeholder until a page with all projects exists (user request 2026-11-24). */}
          <ButtonLink href={worksIntro.button.href} className="works__button">
            {worksIntro.button.label}
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal className="works__slider">
        <ul ref={ref} className="works__cards" tabIndex={0} aria-label="Projects">
          {projects.map((project) => {
            const art = {
              '--art-left': project.art.left,
              '--art-top': project.art.top,
              '--art-width': project.art.width,
              '--card-bg': project.background,
            } as CSSProperties;
            return (
              <li key={project.slug} id={projectCardId(project.slug)} className="works__card">
                <a className="works__link" href={project.href}>
                  <span className="works__image" style={art}>
                    <img src={project.image} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="works__caption">
                    <span className="works__name">{project.title}</span>
                    <span className="works__format">{project.format}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {count > 1 && (
          <div className="works__controls">
            <div className="works__dots">
              {Array.from({ length: count }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className="works__dot"
                  aria-label={`Show projects from ${i + 1}`}
                  aria-current={i === index || undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        )}
      </Reveal>
    </div>
  );
}
