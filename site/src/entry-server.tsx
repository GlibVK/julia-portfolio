import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { PortfolioPage } from './pages/PortfolioPage';

const pages = {
  home: App,
  portfolio: PortfolioPage,
};

type PageName = keyof typeof pages;

/**
 * Build-time render (scripts/prerender.mjs): turns a page into static HTML so search engines
 * and link previews see the content without running JavaScript. main.tsx / portfolio.tsx then
 * hydrate it. Keep the tree identical to mount.tsx.
 */
export function render(page: PageName): string {
  const Page = pages[page];
  return renderToString(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}
