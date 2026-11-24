import { useCallback, useEffect, useState } from 'react';
import type { NavItem } from '../data/site';
import { useActiveSection } from './useActiveSection';

/**
 * Which nav link is active. Today each section has one link; if several links ever share
 * a section, the last clicked one wins inside it, otherwise the first one.
 */
export function useActiveNavItem(items: readonly NavItem[], sectionIds: readonly string[]) {
  const activeSection = useActiveSection(sectionIds);
  // Starts empty on the server and in the first client render (they must match for hydration);
  // the URL hash, if any, is applied right after mount.
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  useEffect(() => {
    if (window.location.hash) setLastClicked(window.location.hash);
  }, []);

  const candidates = items.filter((item) => item.section === activeSection);
  const activeHref =
    candidates.find((item) => item.href === lastClicked)?.href ?? candidates[0]?.href ?? null;

  const onNavigate = useCallback((href: string) => setLastClicked(href), []);

  return { activeHref, onNavigate };
}
