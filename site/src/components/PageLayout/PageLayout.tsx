import type { ReactNode } from 'react';
import './PageLayout.css';

type PageLayoutProps = {
  /** Content of the fixed left column (built in section 01). */
  sidebar?: ReactNode;
  /** Page sections, rendered in the scrolling content column. */
  children: ReactNode;
};

export function PageLayout({ sidebar, children }: PageLayoutProps) {
  return (
    <div className="page">
      <aside className="sidebar">{sidebar}</aside>
      <main className="main">{children}</main>
    </div>
  );
}
