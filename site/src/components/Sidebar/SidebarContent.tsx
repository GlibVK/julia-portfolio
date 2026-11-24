import { contactEmail, creditLink, navItems, projectsGroup, socialLinks } from '../../data/site';
import { Nav } from '../Nav/Nav';
import { SocialLinks } from '../SocialLinks/SocialLinks';
import './SidebarContent.css';

type SidebarContentProps = {
  activeHref: string | null;
  onNavigate?: (href: string) => void;
  navLabel?: string;
};

/** Logo, nav, email, social icons and credit. Used in the fixed sidebar and the menu drawer. */
export function SidebarContent({ activeHref, onNavigate, navLabel }: SidebarContentProps) {
  return (
    <div className="sidebar-content">
      <div className="sidebar-content__top">
        <a className="sidebar-content__logo" href="#home" onClick={() => onNavigate?.('#home')}>
          Julia.
        </a>
        <Nav
          items={navItems}
          group={projectsGroup}
          activeHref={activeHref}
          onNavigate={onNavigate}
          label={navLabel}
        />
      </div>

      <div className="sidebar-content__bottom">
        <a className="sidebar-content__email" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        {/* Grey static lines under the email and under the icons (demo layout). */}
        <div className="sidebar-content__divider" aria-hidden="true" />
        <SocialLinks links={socialLinks} />
        <div className="sidebar-content__divider" aria-hidden="true" />
        <p className="sidebar-content__credit">
          Design by{' '}
          <a href={creditLink.href} target="_blank" rel="noopener noreferrer">
            {creditLink.label}
          </a>
        </p>
      </div>
    </div>
  );
}
