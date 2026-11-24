import { Menu } from './components/Menu/Menu';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Section } from './components/Section/Section';
import { SidebarContent } from './components/Sidebar/SidebarContent';
import { navItems, sectionIds } from './data/site';
import { useActiveNavItem } from './hooks/useActiveNavItem';

/**
 * Page skeleton. Each Section is one Figma frame; content is added section by section
 * (see docs/layout-plan.md). Background number positions come from the Figma frames.
 */
export function App() {
  const { activeHref, onNavigate } = useActiveNavItem(navItems, sectionIds);

  return (
    <>
      <PageLayout sidebar={<SidebarContent activeHref={activeHref} onNavigate={onNavigate} />}>
        {/* Figma 1:130 — content: sections 02, 03 */}
        <Section id="home" label="Home" bgNumber={{ value: '01', x: 1342, y: 463 }} />
        {/* Figma 1:63 — content: section 04 */}
        <Section id="about" label="About" bgNumber={{ value: '01', x: 1342, y: 463 }} />
        {/* Figma 1:183 — content: section 05 */}
        <Section id="works" label="Works" bgNumber={{ value: '02', x: 1371, y: 474 }} />
        {/* Figma 1:2 — content: section 06 */}
        <Section id="biodata" label="Biodata" bgNumber={{ value: '03', x: 1359, y: 466 }}>
          {/* Temporary anchors for the nav; section 06 moves these ids onto the real blocks. */}
          <span id="experience" />
          <span id="education" />
        </Section>
      </PageLayout>
      <Menu activeHref={activeHref} onNavigate={onNavigate} />
    </>
  );
}
