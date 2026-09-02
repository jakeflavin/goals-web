import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import './index.css'

/**
 * Every page entry is the same three lines, so they are these three lines.
 *
 * This is a multi-page build rather than a router, so each page boots its own
 * root. See `vite.config.ts` for why.
 */
export function mount(page: ReactNode) {
  const root = document.getElementById('root')
  if (!root) throw new Error('No #root element on the page.')

  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={theme}>{page}</ThemeProvider>
    </StrictMode>,
  )
}
