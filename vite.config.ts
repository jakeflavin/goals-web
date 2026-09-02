import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Three pages, three entries, three real files in `dist`.
//
// The portfolio's Hosting config rewrites every unmatched path to the directory's own
// `index.html`, and Hosting serves static files before it applies a rewrite. So
// `/goals/privacy/` has to exist as a file or it lands on the directory page instead of
// this site. Building each page into its own folder is what makes that true, and it is
// why this is a multi-page build rather than a router.
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Served from a sub-path of the portfolio's Hosting site.
  base: '/goals/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        support: resolve(import.meta.dirname, 'support/index.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
