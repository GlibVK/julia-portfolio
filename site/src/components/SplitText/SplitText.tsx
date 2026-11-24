import type { CSSProperties, ElementType } from 'react';
import { useRevealTrigger } from '../../hooks/useRevealTrigger';
import './SplitText.css';

type SplitTextProps = {
  text: string;
  /** Heading tag to render, e.g. "h1" or "h2". */
  as?: ElementType;
  className?: string;
};

/**
 * Heading whose letters slide up into place when it scrolls into view (demo "txt-fx slide-up").
 * Screen readers get the plain text from a visually hidden span; the animated letters are aria-hidden.
 */
export function SplitText({ text, as: Tag = 'h2', className }: SplitTextProps) {
  // Replays like the reveals (the demo re-runs letters with its parent's aos-animate class).
  const { ref, active: inView } = useRevealTrigger<HTMLElement>();
  const words = text.split(' ');

  // Letter index runs across the whole text; spaces count too (as in the demo).
  let index = 0;

  return (
    <Tag ref={ref} className={className} data-split-text data-visible={inView || undefined}>
      <span className="visually-hidden">{text}</span>
      <span className="split-text" aria-hidden="true">
        {words.map((word, w) => {
          const letters = Array.from(word).map((letter, l) => {
            const style = { '--letter-index': index++ } as CSSProperties;
            return (
              <span key={l} className="split-text__letter" style={style}>
                {letter}
              </span>
            );
          });
          if (w < words.length - 1) index++; // the space after the word
          return (
            <span key={w}>
              <span className="split-text__word">{letters}</span>
              {w < words.length - 1 && ' '}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
