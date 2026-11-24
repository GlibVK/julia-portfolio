import { useId, useState } from 'react';
import type { NavGroup, NavItem } from '../../data/site';
import './Nav.css';

type NavProps = {
  items: readonly NavItem[];
  /** Optional collapsible group shown after the links (Projects). */
  group?: NavGroup;
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

export function Nav({ items, group, activeHref, onNavigate, label = 'Main' }: NavProps) {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const groupId = useId();

  return (
    <nav className="nav" aria-label={label}>
      <ul className="nav__list">
        {items.map((item) => {
          const isActive = item.href === activeHref;
          return (
            <li key={item.href}>
              <a
                className="nav__link"
                href={item.href}
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
