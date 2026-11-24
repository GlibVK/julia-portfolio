import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * State for a native scroll-snap row (no slider library): how many scroll positions it has
 * (one per card that can start the view, like Swiper's bullets), which one is showing, and
 * a function to scroll to a position. Measured only in effects, so the server render and
 * the first client render match (no controls until the row is known to overflow).
 */
export function useCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);

  /** Distance between the left edges of two neighbouring cards. */
  const step = (el: HTMLElement) => {
    const [first, second] = el.children as unknown as HTMLElement[];
    if (!first) return el.clientWidth;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      const s = step(el);
      // 1px tolerance: fractional card widths leave a sub-pixel overflow.
      setCount(max > 1 ? Math.round(max / s) + 1 : 0);
      setIndex(max > 1 ? Math.round(el.scrollLeft / s) : 0);
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    el.addEventListener('scroll', onScroll, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: i * step(el), behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  return { ref, count, index, goTo };
}
