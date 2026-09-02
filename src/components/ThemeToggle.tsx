import styled from 'styled-components'
import type { Mode } from '../theme'

/**
 * Light or dark, and the screenshots follow.
 *
 * A two-position segmented control rather than one button that flips, because
 * the state matters here: the phones on this page change with it, and a reader
 * who cannot see which of the two is selected cannot tell whether they are
 * looking at the app's light mode or the site's.
 */

const Group = styled.div`
  display: inline-flex;
  padding: 2px;
  border-radius: 999px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
`

const Option = styled.button<{ $on: boolean }>`
  display: grid;
  place-items: center;
  width: 30px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  background: ${({ theme, $on }) => ($on ? theme.color.canvas : 'transparent')};
  color: ${({ theme, $on }) => ($on ? theme.color.textPrimary : theme.color.textSecondary)};

  svg {
    width: 15px;
    height: 15px;
  }
`

function Sun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path
        strokeLinecap="round"
        d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"
      />
    </svg>
  )
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        strokeLinejoin="round"
        d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z"
      />
    </svg>
  )
}

export function ThemeToggle({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  return (
    <Group role="group" aria-label="Colour scheme">
      <Option
        type="button"
        $on={mode === 'light'}
        aria-pressed={mode === 'light'}
        onClick={() => onChange('light')}
      >
        <Sun />
        <span className="sr-only">Light</span>
      </Option>
      <Option
        type="button"
        $on={mode === 'dark'}
        aria-pressed={mode === 'dark'}
        onClick={() => onChange('dark')}
      >
        <Moon />
        <span className="sr-only">Dark</span>
      </Option>
    </Group>
  )
}
