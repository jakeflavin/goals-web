import type { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { Header, Footer } from './Chrome'
import { useThemeMode } from '../hooks/useThemeMode'
import { buildTheme } from '../theme'

/**
 * Everything every page has: the theme, the header and the footer.
 *
 * The scheme lives here rather than in each page because the toggle is in the
 * header and the phones that follow it are in the body, so one owner has to
 * hold both.
 */
export function Shell({ children }: { children: ReactNode }) {
  const [mode, setMode] = useThemeMode()

  return (
    <ThemeProvider theme={buildTheme(mode)}>
      <Header mode={mode} onChangeMode={setMode} />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  )
}
