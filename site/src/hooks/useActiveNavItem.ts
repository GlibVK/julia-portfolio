import { useCallback, useState } from 'react';
import type { NavItem } from '../data/site';
import { useActiveSection } from './useActiveSection';

/**
 * Which nav link is active. Several links can share one section (biodata),
 * so the last clicked link wins inside that section; otherwise the first one.
 */
export function useActiveNavItem(items: readonly NavItem[], sectionIds: readonly string[]) {
  const activeSection = useActiveSection(sectionIds);
  const [lastClicked, setLastClicked] = useState<string | null>(() => window.location.hash || null);

  const candidates = items.filter((item) => item.section === activeSection);
  const activeHref =
    candidates.find((item) => item.href === lastClicked)?.href ?? candidates[0]?.href ?? null;

  const onNavigate = useCallback((href: string) => setLastClicked(href), []);

  return { activeHref, onNavigate };
}
