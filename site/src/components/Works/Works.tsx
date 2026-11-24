import { featuredProjects, projectCardId, projectHref, worksIntro } from '../../data/site';
import { useCarousel } from '../../hooks/useCarousel';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import { ProjectCover } from '../ProjectCover/ProjectCover';
import { Reveal } from '../Reveal/Reveal';
import { SplitText } from '../SplitText/SplitText';
import './Works.css';

/**
 * Works section = the live demo's "Portfolio" (section 04): header with the heading and a short
 * text, then a row of project cards: the featured projects, the same as the sidebar "Portfolio"
 * items; each card has the id the sidebar links to (`#project-<slug>`).
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
          {/* Opens the portfolio page with every project. */}
          <ButtonLink href={worksIntro.button.href} className="works__button">
            {worksIntro.button.label}
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal className="works__slider">
        <ul ref={ref} className="works__cards" tabIndex={0} aria-label="Projects">
          {featuredProjects.map((project) => (
            <li key={project.slug} id={projectCardId(project.slug)} className="works__card">
              <a className="works__link" href={projectHref(project)}>
                <ProjectCover
                  cover={project.cover}
                  sizes="(max-width: 991.98px) 50vw, 383px"
                  className="works__image"
                />
                <span className="works__caption">
                  <span className="works__name">{project.title}</span>
                  <span className="works__format">{project.format}</span>
                </span>
              </a>
            </li>
          ))}
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
