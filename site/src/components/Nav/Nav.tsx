import { useId, useState } from 'react';
import type { NavGroup, NavItem } from '../../data/site';
import './Nav.css';

type NavProps = {
  items: readonly NavItem[];
  /** Optional collapsible group shown after the links (Portfolio). */
  group?: NavGroup;
  /** The group starts open (on the page the group label opens). */
  groupOpen?: boolean;
  /** The group label's page is the current page. */
  groupCurrent?: boolean;
  /**
   * Put before the section anchors ("#about"): "" on the home page, "/" on other pages,
   * so the links lead back to the home page sections.
   */
  linkBase?: string;
  activeHref: string | null;
  /** Called when a link is clicked (records the choice, closes the drawer). */
  onNavigate?: (href: string) => void;
  /** Accessible name; must differ if two navs can be visible at once. */
  label?: string;
};

/** Chevron like the demo's "Pages" toggle: points right, turns down when open. */
function Chevron() {
  return (
    <svg className="nav__chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M5 14l6-6-6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav({
  items,
  group,
  groupOpen = false,
  groupCurrent = false,
  linkBase = '',
  activeHref,
  onNavigate,
  label = 'Main',
}: NavProps) {
  const [isGroupOpen, setIsGroupOpen] = useState(groupOpen);
  const groupId = useId();
  const groupHref = group?.href;

  return (
    <nav className="nav" aria-label={label}>
      <ul className="nav__list">
        {items.map((item) => {
          const isActive = item.href === activeHref;
          return (
            <li key={item.href}>
              <a
                className="nav__link"
                href={linkBase + item.href}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onNavigate?.(item.href)}
              >
                {item.label}
              </a>
            </li>
          );
        })}

        {group && (
          <li>
            {groupHref ? (
              // Label = link to the group's page; the chevron next to it shows or hides the items.
              <div className="nav__split">
                <a
                  className="nav__link nav__split-link"
                  href={groupHref}
                  aria-current={groupCurrent ? 'page' : undefined}
                  onClick={() => onNavigate?.(groupHref)}
                >
                  {group.label}
                </a>
                <button
                  type="button"
                  className="nav__toggle nav__split-toggle"
                  aria-label={`${group.label} projects`}
                  aria-expanded={isGroupOpen}
                  aria-controls={groupId}
                  onClick={() => setIsGroupOpen((open) => !open)}
                >
                  <Chevron />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="nav__link nav__toggle"
                aria-expanded={isGroupOpen}
                aria-controls={groupId}
                onClick={() => setIsGroupOpen((open) => !open)}
              >
                {group.label}
                <Chevron />
              </button>
            )}
            {/* Grid rows 0fr -> 1fr animates the height; inert keeps hidden links out of Tab order. */}
            <div id={groupId} className="nav__group" data-open={isGroupOpen} inert={!isGroupOpen}>
              <ul className="nav__group-list">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      className="nav__group-link"
                      href={item.href}
                      onClick={() => onNavigate?.(item.href)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}
