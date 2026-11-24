import { useEffect, useState } from 'react';
import {
  portfolioCategories,
  portfolioIntro,
  projectCardId,
  projectHref,
  projects,
  type PortfolioCategory,
} from '../../data/site';
import { ProjectCover } from '../ProjectCover/ProjectCover';
import { Reveal } from '../Reveal/Reveal';
import { SplitText } from '../SplitText/SplitText';
import './Portfolio.css';

/** Tile widths for `sizes`: 4 or 3 columns on desktops, 2 below 992px. */
const TILE_SIZES = '(max-width: 991.98px) 50vw, (max-width: 1199.98px) 160px, 284px';

/**
 * Portfolio page content = the demo's portfolio-masonry.html: centred header, category filters
 * and a grid of every project in `projects` (site.ts). The filters show the projects of one
 * category ("All" shows every project); a link to a tile (#project-<slug>, sidebar) shows all
 * projects again so the tile can be seen.
 */
export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory | null>(null);
  const visible = filter ? projects.filter((project) => project.categories.includes(filter)) : projects;

  useEffect(() => {
    const showTarget = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith(projectCardId(''))) return;
      setFilter(null);
      // The tile may have been hidden by a filter: scroll to it once it is back.
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    };
    window.addEventListener('hashchange', showTarget);
    return () => window.removeEventListener('hashchange', showTarget);
  }, []);

  const filters: { label: string; value: PortfolioCategory | null }[] = [
    { label: portfolioIntro.allLabel, value: null },
    ...portfolioCategories.map((category) => ({ label: category, value: category })),
  ];

  return (
    <div className="portfolio">
      <Reveal className="portfolio__header">
        <p className="portfolio__eyebrow">{portfolioIntro.eyebrow}</p>
        <SplitText as="h1" className="portfolio__heading" text={portfolioIntro.heading} />
        <p className="portfolio__text">{portfolioIntro.text}</p>
      </Reveal>

      <Reveal className="portfolio__filters">
        <div className="portfolio__filter-list" role="group" aria-label="Show projects by category">
          {filters.map(({ label, value }) => (
            <button
              key={label}
              type="button"
              className="portfolio__filter"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="visually-hidden" role="status">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
      </Reveal>

      <Reveal>
        {/* A new key per filter re-mounts the tiles, so the shown ones fade in again. */}
        <ul key={filter ?? 'all'} className="portfolio__grid" aria-label="Projects">
          {visible.map((project) => (
            <li key={project.slug} id={projectCardId(project.slug)} className="portfolio__tile">
              <a className="portfolio__link" href={projectHref(project)}>
                <ProjectCover cover={project.cover} sizes={TILE_SIZES} />
                <span className="visually-hidden">{project.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
