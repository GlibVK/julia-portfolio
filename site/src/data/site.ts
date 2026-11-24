// Site content shared by the sidebar and the menu drawer.
// Placeholder links: replace the email and social URLs with real ones before launch.

export type NavItem = {
  label: string;
  /** Anchor the link points to. */
  href: `#${string}`;
  /** Id of the page section (Figma frame) that contains the anchor. */
  section: string;
};

/**
 * Nav as in the live demo (user decision 2026-11-24): one item per section, in page order
 * (the demo's Contact and Get PRO are not built; Projects follows as a collapsible group).
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '#home', section: 'home' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Experience', href: '#experience', section: 'experience' },
  { label: 'Works', href: '#works', section: 'works' },
];

/** Page section ids in scroll order (as in App.tsx), used by the scrollspy. */
export const sectionIds = navItems.map((item) => item.section);

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
