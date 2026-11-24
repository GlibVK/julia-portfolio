import type { CSSProperties } from 'react';
import './BackgroundNumber.css';

export type BackgroundNumberProps = {
  /** Text to show, e.g. "01". */
  value: string;
  /** Left edge of the text box in the 1920px Figma frame, px. */
  x?: number;
  /** Top edge of the text box in the Figma frame, px. */
  y?: number;
};

/**
 * Decorative number behind a section. Hidden from screen readers.
 * The parent must be positioned (the Section component already is).
 */
export function BackgroundNumber({ value, x, y }: BackgroundNumberProps) {
  const style = {
    ...(x !== undefined && { '--bg-number-x': x }),
    ...(y !== undefined && { '--bg-number-y': y }),
  } as CSSProperties;

  return (
    <span className="bg-number" aria-hidden="true" style={style}>
      {value}
    </span>
  );
}
