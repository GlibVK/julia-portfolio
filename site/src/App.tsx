import { Biodata } from './components/Biodata/Biodata';
import { Contact } from './components/Contact/Contact';
import { ExperienceIntro } from './components/ExperienceIntro/ExperienceIntro';
import { HomeHero } from './components/HomeHero/HomeHero';
import { Menu } from './components/Menu/Menu';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Section } from './components/Section/Section';
import { SidebarContent } from './components/Sidebar/SidebarContent';
import { navItems, sectionIds } from './data/site';
import { Works } from './components/Works/Works';
import { useActiveNavItem } from './hooks/useActiveNavItem';
import { useSmoothWheel } from './hooks/useSmoothWheel';

/**
 * Page skeleton in the live demo's order (user decision 2026-11-24): Home 01, About 02,
 * Experience 03, Works 04; one nav item per section (see docs/layout-plan.md).
 * Background numbers sit where the demo draws them: the box's right edge 120.8px past the
 * demo section and 100px above its bottom; x, y are the box's top-left in 2000px page px.
 */
export function App() {
  const { activeHref, onNavigate } = useActiveNavItem(navItems, sectionIds);
  useSmoothWheel();

  return (
    <>
      <PageLayout sidebar={<SidebarContent activeHref={activeHref} onNavigate={onNavigate} />}>
        {/* Sections 02, 03 (Figma 1:130, laid out as the demo) */}
        <Section id="home" label="Home" bgNumber={{ value: '01', x: 1325, y: 249 }}>
          <HomeHero />
        </Section>
        {/* Section 06: the demo's "BIODATA" (Figma 1:2); glyph baseline 848 below the top */}
        <Section id="about" label="About" bgNumber={{ value: '02', x: 1325, y: 291.5 }}>
          <Biodata />
        </Section>
        {/* Section 04: "Experienced Creative mind" (Figma 1:63); glyph baseline 754 below the top */}
        <Section id="experience" label="Experience" bgNumber={{ value: '03', x: 1325, y: 198 }}>
          <ExperienceIntro />
        </Section>
        {/* Section 05: the demo's "Portfolio" (Figma 1:183); glyph baseline 666 below the top */}
        <Section id="works" label="Works" bgNumber={{ value: '04', x: 1325, y: 109.7 }}>
          <Works />
        </Section>
        {/* The demo's "Contact Me" (section 05, not in Figma); glyph baseline 645 below the top */}
        <Section id="contact" label="Contact" bgNumber={{ value: '05', x: 1325, y: 88.9 }}>
          <Contact />
        </Section>
      </PageLayout>
      <Menu activeHref={activeHref} onNavigate={onNavigate} />
    </>
  );
}
