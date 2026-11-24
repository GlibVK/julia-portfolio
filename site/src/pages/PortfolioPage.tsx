import { Menu } from '../components/Menu/Menu';
import { PageLayout } from '../components/PageLayout/PageLayout';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { SidebarContent } from '../components/Sidebar/SidebarContent';
import { useSmoothWheel } from '../hooks/useSmoothWheel';

/** Nothing to mark: the sidebar marks the "Portfolio" label itself on this page. */
const noop = () => {};

/**
 * /portfolio/ page (user request 2026-11-24): every project, opened by "View All", "View all
 * works" and the sidebar "Portfolio" label. Same sidebar and menu as the home page; their
 * section links lead back to the home page.
 */
export function PortfolioPage() {
  useSmoothWheel();

  return (
    <>
      <PageLayout sidebar={<SidebarContent activeHref={null} page="portfolio" />}>
        <Portfolio />
      </PageLayout>
      <Menu activeHref={null} onNavigate={noop} page="portfolio" />
    </>
  );
}
