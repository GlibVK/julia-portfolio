import type { ReactNode } from 'react';
import { BackgroundNumber, type BackgroundNumberProps } from '../BackgroundNumber/BackgroundNumber';
import './Section.css';

type SectionProps = {
  /** Anchor id used by the sidebar nav, e.g. "home". */
  id: string;
  /** Accessible name of the section (used when it has no visible heading yet). */
  label?: string;
  /** Optional large background number. */
  bgNumber?: BackgroundNumberProps;
  children?: ReactNode;
};

export function Section({ id, label, bgNumber, children }: SectionProps) {
  return (
    <section id={id} className="section" aria-label={label}>
      {bgNumber && <BackgroundNumber {...bgNumber} />}
      <div className="section__content">{children}</div>
    </section>
  );
}
