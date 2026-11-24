import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/tokens.css';
import './styles/base.css';

// Dev helper: open the page with ?grid to outline the sidebar and sections.
if (new URLSearchParams(window.location.search).has('grid')) {
  document.documentElement.classList.add('debug-grid');
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
