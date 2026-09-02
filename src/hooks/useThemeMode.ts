import { useCallback, useEffect, useState } from 'react'
import { THEME_KEY, type Mode } from '../theme'

/**
 * The reader's light or dark preference.
 *
 * Three rules, in this order: an explicit choice they made here wins, the
 * system preference is the default, and a system change is followed only while
 * they have not chosen. That last part is what makes the toggle a preference
 * rather than an override that sticks until the tab is closed.
 *
 * The first paint is not this hook's job. An inline script in each page's
 * `<head>` has already written `data-theme` on `<html>` before any of this
 * loads, so there is no flash of the wrong scheme; this reads that attribute
 * back rather than deciding again and risking a different answer.
 */
export function useThemeMode(): [Mode, (mode: Mode) => void] {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  })

  // Follow the system, but only while nothing has been chosen here.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null
      try {
        stored = localStorage.getItem(THEME_KEY)
      } catch {
        // Private mode, or site data blocked. Follow the system, which is the
        // same thing as having no stored choice.
      }
      if (stored === 'light' || stored === 'dark') return
      setMode(event.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.colorScheme = mode
  }, [mode])

  const choose = useCallback((next: Mode) => {
    setMode(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // The choice still applies to this page; it just will not be remembered.
    }
  }, [])

  return [mode, choose]
}
