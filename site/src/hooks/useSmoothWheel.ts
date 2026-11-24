import { useEffect } from 'react';

/** How quickly the page catches up with the wheel target, ms. Larger = softer, longer glide. */
const GLIDE_MS = 110;
/** Pixels per wheel line, for browsers that report lines (Firefox mouse wheel). */
const LINE_PX = 40;

/**
 * Smooth mouse-wheel scrolling for the whole page (no library).
 *
 * The browser scrolls a mouse wheel in hard steps. This hook takes over mouse-wheel
 * events only, moves a target position by each notch and lets the page glide to it.
 * Left to the browser (native behaviour):
 * - touchpads and touch screens (they already scroll smoothly; taking them over feels "laggy");
 * - users with prefers-reduced-motion: reduce;
 * - Ctrl + wheel (page zoom) and horizontal wheels;
 * - wheel over an inner scrollable area (e.g. the sidebar when it overflows) or an open dialog.
 * Keyboard, scrollbar dragging and anchor links keep working; the target re-syncs to them.
 */
export function useSmoothWheel() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let target = window.scrollY;
    let current = window.scrollY;
    let frame = 0;
    let lastTime = 0;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const step = (time: number) => {
      const dt = lastTime ? time - lastTime : 16;
      lastTime = time;
      // Time-based easing: the same feel at 60 Hz and 144 Hz.
      current += (target - current) * (1 - Math.exp(-dt / GLIDE_MS));
      if (Math.abs(target - current) < 0.5) current = target;
      // 'instant' bypasses the CSS scroll-behavior: smooth, which would fight this animation.
      window.scrollTo({ top: current, behavior: 'instant' });
      if (current !== target) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (reducedMotion.matches || event.ctrlKey || event.defaultPrevented) return;
      if (!isMouseWheel(event) || isInsideScrollable(event.target)) return;

      event.preventDefault();
      if (!frame) {
        // Start from where the page really is (it may have moved by keyboard or a link).
        current = window.scrollY;
        target = current;
        lastTime = 0;
      }
      const delta = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * LINE_PX : event.deltaY;
      target = Math.min(Math.max(target + delta, 0), maxScroll());
      if (!frame) frame = requestAnimationFrame(step);
    };

    // A click on the scrollbar, a key or an anchor during a glide: stop and hand over.
    const cancel = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', cancel);
    window.addEventListener('pointerdown', cancel);
    return () => {
      cancel();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', cancel);
      window.removeEventListener('pointerdown', cancel);
    };
  }, []);
}

/**
 * Mouse wheels move in notches; touchpads send many small, fractional deltas.
 * Chromium and Safari still expose the legacy `wheelDeltaY`, which is a multiple of 120
 * for a mouse notch; Firefox reports mouse wheels in lines (deltaMode 1).
 */
function isMouseWheel(event: WheelEvent): boolean {
  if (event.deltaY === 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return false;
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return true;
  const legacy = (event as WheelEvent & { wheelDeltaY?: number }).wheelDeltaY;
  return typeof legacy === 'number' && legacy !== 0 && legacy % 120 === 0;
}

/** True if the wheel happens over an element (not the page) that can scroll vertically itself. */
function isInsideScrollable(target: EventTarget | null): boolean {
  let el = target instanceof Element ? target : null;
  while (el && el !== document.body && el !== document.documentElement) {
    if (el instanceof HTMLDialogElement && el.open) return true;
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}
