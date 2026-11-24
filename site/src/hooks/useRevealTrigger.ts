import { useEffect, useRef, useState } from 'react';

/** AOS "offset": the reveal starts when the element's top passes this far above the bottom edge. */
const TRIGGER_OFFSET_PX = 120;

type Watcher = { element: HTMLElement; update: (active: boolean) => void };

/*
 * One scroll/resize listener for every reveal on the page. On each frame it first reads all
 * positions, then reports them, so the browser computes layout once per frame no matter how
 * many blocks animate (separate listeners would each force their own layout read).
 */
const watchers = new Set<Watcher>();
let frame = 0;

function checkAll() {
  frame = 0;
  const line = window.innerHeight - TRIGGER_OFFSET_PX;
  const results: [Watcher, boolean][] = [];
  for (const watcher of watchers) {
    results.push([watcher, isAboveLine(watcher.element, line)]);
  }
  for (const [watcher, active] of results) watcher.update(active);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(checkAll);
}

/** The element's real top (its layout place, ignoring its own reveal translate) vs the line. */
function isAboveLine(element: HTMLElement, line: number) {
  const rect = element.getBoundingClientRect();
  // Current translateY of the element itself (mid-transition values included).
  const shiftY = new DOMMatrixReadOnly(getComputedStyle(element).transform).m42;
  return rect.top - shiftY < line;
}

function watch(watcher: Watcher) {
  if (watchers.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  }
  watchers.add(watcher);
  // First check right away, as before (shows blocks that are already on screen without waiting).
  watcher.update(isAboveLine(watcher.element, window.innerHeight - TRIGGER_OFFSET_PX));
  return () => {
    watchers.delete(watcher);
    if (watchers.size === 0) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/**
 * Scroll trigger that behaves like the demo's AOS (once: false, mirror: false).
 *
 * `active` is true while the element's real top (its layout place, ignoring the reveal's own
 * translate) is above the line 120px from the bottom of the screen. So:
 * - scrolling down past the line plays the reveal;
 * - scrolling back up until the element is below the line hides it again (it replays next time);
 * - an element that leaves through the top of the screen stays shown.
 *
 * IntersectionObserver is not used because it sees the element where it is drawn: a block that
 * is moving 100px during its transition would cross its own trigger line and flicker.
 */
export function useRevealTrigger<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return watch({ element, update: setActive });
  }, []);

  return { ref, active };
}
