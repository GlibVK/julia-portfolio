import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { pages } from '../../data/site';
import { SidebarContent } from '../Sidebar/SidebarContent';
import './Menu.css';

/** Width from which the fixed sidebar is shown; keep in sync with Menu.css and PageLayout.css. */
const DESKTOP_QUERY = '(min-width: 992px)';

type MenuProps = {
  activeHref: string | null;
  onNavigate: (href: string) => void;
  page?: keyof typeof pages;
};

/** Three bars (Figma 1:133): the middle one is shorter and grows to full length on hover. */
function MenuIcon() {
  return (
    <span className="menu-icon" aria-hidden="true">
      <span className="menu-icon__bar menu-icon__bar--top" />
      <span className="menu-icon__bar menu-icon__bar--middle" />
      <span className="menu-icon__bar menu-icon__bar--bottom" />
    </span>
  );
}

/**
 * Top-right menu button + drawer (below 992px). The panel slides in from the left, and the
 * button seems to turn into an X: the dialog has its own close button at the same spot,
 * whose bars morph from the burger shape on open and back on close.
 *
 * The drawer is a native <dialog> opened with showModal():
 * the browser traps focus inside it, closes it on Esc, makes the page behind it inert
 * and returns focus to the button on close.
 */
export function Menu({ activeHref, onNavigate, page }: MenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const closeMenu = () => dialogRef.current?.close();

  // When the window grows to the desktop width the sidebar appears, so close the drawer.
  // CSS alone would only hide it: a hidden modal dialog would still block the page.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const handleChange = () => {
      if (query.matches) dialogRef.current?.close();
    };
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  // The dialog covers the whole viewport and the panel is its child, so a click that lands
  // on the dialog itself is a click on the empty area next to the panel.
  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeMenu();
  };

  const handleNavigate = (href: string) => {
    onNavigate(href);
    closeMenu();
  };

  return (
    <>
      <button
        type="button"
        className="menu-button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="site-menu"
        onClick={openMenu}
      >
        <MenuIcon />
      </button>

      <dialog
        id="site-menu"
        ref={dialogRef}
        className="menu-drawer"
        aria-label="Menu"
        onClick={handleDialogClick}
        onClose={() => setIsOpen(false)}
      >
        <button
          type="button"
          className="menu-button menu-button--close"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <MenuIcon />
        </button>
        <div className="menu-drawer__panel">
          <SidebarContent activeHref={activeHref} onNavigate={handleNavigate} navLabel="Menu" page={page} />
        </div>
      </dialog>
    </>
  );
}
