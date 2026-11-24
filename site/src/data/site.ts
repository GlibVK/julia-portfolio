// Site content shared by the sidebar and the menu drawer.
// Placeholder links: replace the email and social URLs with real ones before launch.
import facebookIcon from '@figma/01-sidebar/social/facebook.svg';
import instagramIcon from '@figma/01-sidebar/social/instagram.svg';
import twitterIcon from '@figma/01-sidebar/social/twitter.svg';
import skypeIcon from '@figma/01-sidebar/social/skype.svg';
import linkedinIcon from '@figma/01-sidebar/social/linkedin.svg';
import dribbbleIcon from '@figma/01-sidebar/social/dribbble.svg';

export type NavItem = {
  label: string;
  /** Anchor the link points to. */
  href: `#${string}`;
  /** Id of the page section (Figma frame) that contains the anchor. */
  section: string;
};

/** Nav order and labels follow Figma frame 1:130. */
export const navItems: NavItem[] = [
  { label: 'Home', href: '#home', section: 'home' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Works', href: '#works', section: 'works' },
  // Experience and Education share one screen (biodata, section 06).
  { label: 'Experience', href: '#experience', section: 'biodata' },
  { label: 'Education', href: '#education', section: 'biodata' },
];

/** Page section ids in scroll order, used by the scrollspy. */
export const sectionIds = [...new Set(navItems.map((item) => item.section))];

export type NavGroup = {
  label: string;
  items: { label: string; href: string }[];
};

/**
 * Collapsible "Projects" item at the end of the nav (replaces "References").
 * Placeholders: replace labels and links with real projects later.
 */
export const projectsGroup: NavGroup = {
  label: 'Projects',
  items: [
    { label: 'Project 1', href: '#works' },
    { label: 'Project 2', href: '#works' },
    { label: 'Project 3', href: '#works' },
  ],
};

export const contactEmail = 'contact@yoursite.com';

export type SocialLink = { name: string; href: string; icon: string };

/** Order follows Figma (frame 1:144). */
export const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://www.facebook.com/', icon: facebookIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: instagramIcon },
  { name: 'Twitter', href: 'https://twitter.com/', icon: twitterIcon },
  { name: 'Skype', href: 'https://www.skype.com/', icon: skypeIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: linkedinIcon },
  { name: 'Dribbble', href: 'https://dribbble.com/', icon: dribbbleIcon },
];

export const creditLink = { label: 'TemplatesJungle', href: 'https://templatesjungle.com/' };
