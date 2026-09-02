import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { buildTheme, type Mode } from '../theme'

/** Every page needs a theme, so no test should have to remember to add one.
 *  The mode is a parameter because several tests are about what changes with
 *  it. */
export function renderPage(page: ReactElement, mode: Mode = 'dark') {
  return render(<ThemeProvider theme={buildTheme(mode)}>{page}</ThemeProvider>)
}
