// Site content shared by the sidebar and the menu drawer.
// Placeholder links: replace the email and social URLs with real ones before launch.
import nostalgiaPortraitArt from '@figma/05-works/card-1-nostalgia-portrait.svg';
import workoholicCityArt from '@figma/05-works/card-2-workoholic-city.svg';
import zooKeeperEnvelopeArt from '@figma/05-works/card-3-zoo-keeper-envelope.svg';

export type NavItem = {
  label: string;
  /** Anchor the link points to. */
  href: `#${string}`;
  /** Id of the page section (Figma frame) that contains the anchor. */
  section: string;
};

/**
 * Nav as in the live demo (user decision 2026-11-24): one item per section, in page order
 * (the demo's Get PRO is not built; the Portfolio group follows as a collapsible item).
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '#home', section: 'home' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Works', href: '#works', section: 'works' },
  { label: 'Contact', href: '#contact', section: 'contact' },
];

/** Page section ids in scroll order (as in App.tsx), used by the scrollspy. */
export const sectionIds = navItems.map((item) => item.section);

export type NavGroup = {
  label: string;
  items: { label: string; href: string }[];
};

export type Project = {
  /** Short id for anchors and, later, page URLs ("nostalgia-portrait"). */
  slug: string;
  title: string;
  /** File format tag shown on the card. */
  format: 'svg' | 'psd' | 'png';
  /** Card illustration (Figma 1:225, 1:251, 1:281: the demo's portfolio art without background). */
  image: string;
  /** Card background (Figma). */
  background: string;
  /** Illustration box inside the 393x368 card, Figma px. */
  art: { left: number; top: number; width: number };
  /**
   * Where the card and the sidebar item lead. For now the card itself in the Works section;
   * change it to the project page (e.g. `/projects/<slug>`) when real projects exist.
   */
  href: string;
};

/**
 * Portfolio projects: ONE list for the Works cards and the sidebar "Portfolio" items
 * (user decision 2026-11-24). Placeholders from the demo; replace with real projects later.
 */
export const projects: Project[] = [
  {
    slug: 'nostalgia-portrait',
    title: 'Nostalgia portrait',
    format: 'svg',
    image: nostalgiaPortraitArt,
    background: '#eff7f8',
    art: { left: 106, top: 78, width: 206.341 },
    href: '#project-nostalgia-portrait',
  },
  {
    slug: 'workoholic-city',
    title: 'Workoholic city design',
    format: 'svg',
    image: workoholicCityArt,
    background: '#f6e0e0',
    art: { left: 83, top: 91, width: 252.334 },
    href: '#project-workoholic-city',
  },
  {
    slug: 'zoo-keeper-envelope',
    title: 'Zoo keeper envelope',
    format: 'psd',
    image: zooKeeperEnvelopeArt,
    background: '#f4ecfe',
    art: { left: 77, top: 97, width: 220.638 },
    href: '#project-zoo-keeper-envelope',
  },
];

/** Id of a project's card in the Works section (the target of `#project-<slug>`). */
export const projectCardId = (slug: string) => `project-${slug}`;

/**
 * Collapsible "Portfolio" item at the end of the nav (was "Projects", renamed by the user
 * 2026-11-24): the same projects as the Works cards.
 */
export const projectsGroup: NavGroup = {
  label: 'Portfolio',
  items: projects.map((project) => ({ label: project.title, href: project.href })),
};

/** Works section header (demo "Portfolio"). */
export const worksIntro = {
  eyebrow: 'Some of my recent works',
  heading: 'Portfolio',
  text: 'Labore accusam in modo compungi, iacentem substantiales um se sed esse haec.',
  /** Placeholder: points to the cards until a page with all projects exists. */
  button: { label: 'View All', href: '#works' },
};

export const contactEmail = 'contact@yoursite.com';

export type Service = { title: string; text: string };

/** Home services row (Figma 1:162, 1:166, 1:170); numbers 01-03 come from the order. */
export const services: Service[] = [
  { title: 'UI/UX Design', text: 'At in proin consequat ut cursus venenatis sapien.' },
  { title: 'Illustration', text: 'At in proin consequat ut cursus venenatis sapien.' },
  { title: 'Graphic Design', text: 'At in proin consequat ut cursus venenatis sapien.' },
];

export type BiodataEntry = { date: string; title: string; text: string };
export type BiodataGroup = { heading: string; entries: BiodataEntry[] };

/**
 * About section ("BIODATA"), as in the live demo's section "02": four groups in a 2x2 grid.
 * Placeholders from the demo: replace with real details before launch.
 */
export const biodata = {
  eyebrow: 'Biodata',
  groups: [
    {
      heading: 'Education',
      entries: [
        {
          date: '1998 - 2004',
          title: 'Bachelors in Engineering in Information Technology',
          text: 'Harvard School of Science and management',
        },
        { date: '2004 - 2006', title: 'Masters in Data Analysis', text: 'Harvard School of Science and management' },
      ],
    },
    {
      heading: 'Experiences',
      entries: [
        {
          date: '2007 - 2012',
          title: 'Creative Agency Inc.: Design head',
          text: 'iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.',
        },
        {
          date: '2013 - present',
          title: 'Studio Alpha.: Project Manager',
          text: 'iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.',
        },
      ],
    },
    {
      heading: 'Interests',
      entries: [
        {
          date: '2007 - 2012',
          title: 'Bachelors in Engineering in Information Technology',
          text: 'Harvard School of Science and management',
        },
        {
          date: '2013 - present',
          title: 'Studio Alpha.: Project Manager',
          text: 'iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.',
        },
      ],
    },
    {
      heading: 'References',
      entries: [
        {
          date: '1998 - 2004',
          title: 'Dr. Stephen H. King',
          text: 'iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.',
        },
        {
          date: '2004 - 2006',
          title: 'Dr. David Howard',
          text: 'iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.',
        },
      ],
    },
  ] satisfies BiodataGroup[],
};

/** Experience section intro, as in the live demo (section "03", user request 2026-11-24). */
export const experienceIntro = {
  eyebrow: 'Introduction',
  heading: 'Experienced Creative mind',
  text: 'Labore accusam in modo compungi, iacentem substantiales um se sed esse haec.',
};

export type InfoRow = { label: string; value: string; href?: string };

/** Personal info table (demo). Placeholders: replace with real details before launch. */
export const personalInfo: InfoRow[] = [
  { label: 'Age', value: '22' },
  { label: 'Residence', value: 'United States' },
  { label: 'Address', value: 'A City, Florida, 32104' },
  { label: 'E-mail', value: 'hello@yourwebsite.com', href: 'mailto:hello@yourwebsite.com' },
  { label: 'Phone', value: '+2345 344 678 563', href: 'tel:+2345344678563' },
];

export type Skill = { name: string; value: number };

/**
 * Skill bars (demo). value is a percentage: it sets both the label and the bar width
 * (the demo draws Illustrator at 90% while its label says 75%; ours always match).
 */
export const skills: Skill[] = [
  { name: 'Adobe Photoshop', value: 90 },
  { name: 'Adobe Illustrator', value: 75 },
  { name: 'Figma', value: 80 },
  { name: 'Adobe After Effect', value: 70 },
  { name: 'Photography', value: 95 },
];

/** "View all works" button. Placeholder: points to the Works section until a projects page exists. */
export const allWorksLink = { label: 'View all works', href: '#works' };

export type SocialIcon = 'facebook' | 'twitter' | 'youtube' | 'pinterest' | 'instagram';
export type SocialLink = { name: string; href: string; icon: SocialIcon };

/** Icons and order as in the live demo (user decision 2026-11-24). */
export const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { name: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
  { name: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
  { name: 'Pinterest', href: 'https://www.pinterest.com/', icon: 'pinterest' },
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
];

export const creditLink = { label: 'TemplatesJungle', href: 'https://templatesjungle.com/' };

/** Contact section intro (demo section "05"). */
export const contactIntro = {
  eyebrow: 'Personal Info',
  heading: 'Contact Me',
  text: 'Labore accusam in modo compungi, iacentem substantiales um se sed esse haec.',
};

export type FaqItem = { question: string; answer: string };

const faqAnswer =
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

/** FAQ accordion (demo). Placeholders: replace with real answers before launch. */
export const faq = {
  heading: 'Frequently Asked Questions',
  items: [
    { question: 'What experience do you have in my industry?', answer: faqAnswer },
    { question: 'How many clients do you typically work with at once?', answer: faqAnswer },
    { question: 'Do you have the capacity to take on this project right now?', answer: faqAnswer },
  ] satisfies FaqItem[],
};

/**
 * Contact form (demo). For now it opens the visitor's email app with the message addressed to
 * `contactEmail` (mailto, no third-party service; user decision 2026-11-24).
 */
export const contactForm = {
  heading: 'Feel free to send me a message or any word of appreciation.',
  name: 'Your Full Name',
  email: 'Your Email Address',
  message: 'Your Message',
  submit: 'Submit',
  sent: 'Your email app should open with the message ready to send.',
};
