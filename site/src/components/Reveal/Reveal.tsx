import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useRevealTrigger } from '../../hooks/useRevealTrigger';
import './Reveal.css';

export type RevealEffect = 'fade-up' | 'fade-right' | 'fade-in';

type RevealProps = {
  effect?: RevealEffect;
  /** Delay before the transition starts, ms (used for staggering siblings, as data-aos-delay). */
  delay?: number;
  /** Element to render, e.g. "li" inside a list. Default "div". */
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Scroll reveal (replaces AOS, same timing and trigger as the demo). Renders an element with
 * data attributes; Reveal.css does the motion. Plays when the element's top passes 120px above
 * the bottom edge and replays after scrolling back up (useRevealTrigger).
 * Content stays visible without JS and with prefers-reduced-motion.
 */
export function Reveal({ effect = 'fade-up', delay = 0, as: Tag = 'div', className, children }: RevealProps) {
  const { ref, active } = useRevealTrigger<HTMLElement>();
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={effect}
      data-visible={active || undefined}
      style={style}
    >
      {children}
    </Tag>
  );
}
