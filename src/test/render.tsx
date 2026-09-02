import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'

/** Every page needs the theme, so no test should have to remember to add it. */
export function renderPage(page: ReactElement) {
  return render(<ThemeProvider theme={theme}>{page}</ThemeProvider>)
}
