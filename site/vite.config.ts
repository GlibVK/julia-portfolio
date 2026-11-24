import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mockup assets live outside the app folder, in ../images/figma.
// The alias lets components import them as '@figma/01-sidebar/julia-logo.svg'.
const figmaAssets = fileURLToPath(new URL('../images/figma', import.meta.url));

// One HTML file per page (multi-page build): / and /portfolio/.
const page = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  // Where the site is served from: "/" by default; the GitHub Pages workflow sets
  // BASE_PATH=/<repository>/ because a project site lives at https://<user>.github.io/<repository>/.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  resolve: {
    alias: { '@figma': figmaAssets },
  },
  build: {
    rolldownOptions: {
      input: {
        main: page('./index.html'),
        portfolio: page('./portfolio/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    // Allow the dev server to read files from the parent folder (../images/figma).
    fs: { allow: ['..'] },
  },
});
