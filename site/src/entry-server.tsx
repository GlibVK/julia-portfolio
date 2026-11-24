import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';

/**
 * Build-time render (scripts/prerender.mjs): turns the page into static HTML so search engines
 * and link previews see the content without running JavaScript. main.tsx then hydrates it.
 * Keep the tree identical to main.tsx.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
