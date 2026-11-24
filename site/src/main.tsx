import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';

// html.js (reveal animations may hide content) is set by an inline script in index.html,
// before the first paint. Repeated here for safety; adding a class twice does nothing.
document.documentElement.classList.add('js');

// Dev helper: open the page with ?grid to outline the sidebar and sections (dev server only).
if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('grid')) {
  document.documentElement.classList.add('debug-grid');
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build ships prerendered HTML (scripts/prerender.mjs): React attaches to it.
// The dev server serves an empty #root: React renders from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
