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

/**
 * Everything a reader or a screen reader gets from a rendered tree: its text,
 * and the words in its alt, aria-label and title attributes, which hold copy
 * too and which `textContent` never sees.
 */
export function everyWord(container: HTMLElement) {
  const attributes = [...container.querySelectorAll('[alt],[aria-label],[title]')].flatMap((node) =>
    ['alt', 'aria-label', 'title'].map((name) => node.getAttribute(name) ?? ''),
  )
  return [container.textContent ?? '', ...attributes].join('\n')
}
