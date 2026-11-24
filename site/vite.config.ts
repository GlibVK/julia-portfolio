import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mockup assets live outside the app folder, in ../images/figma.
// The alias lets components import them as '@figma/01-sidebar/julia-logo.svg'.
const figmaAssets = fileURLToPath(new URL('../images/figma', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@figma': figmaAssets },
  },
  server: {
    port: 5173,
    // Allow the dev server to read files from the parent folder (../images/figma).
    fs: { allow: ['..'] },
  },
});
