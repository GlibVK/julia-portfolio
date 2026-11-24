import type { Service } from '../../data/site';
import { Reveal } from '../Reveal/Reveal';
import './Services.css';

type ServicesProps = {
  items: Service[];
  className?: string;
  /** Stagger between items, ms (demo: 100). */
  stagger?: number;
};

/**
 * Numbered services (Home row, reused in About). Each item fades up on its own (demo AOS timing)
 * when its top passes 120px above the bottom edge: on load if it is high enough, otherwise
 * while scrolling.
 */
export function Services({ items, className, stagger = 100 }: ServicesProps) {
  return (
    <ul className={['services', className].filter(Boolean).join(' ')}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} className="services__item" delay={i * stagger}>
          <span className="services__number">{String(i + 1).padStart(2, '0')}</span>
          <h2 className="services__title">{item.title}</h2>
          <p className="services__text">{item.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}
