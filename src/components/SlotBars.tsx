import styled from 'styled-components'
import { SLOT_COLOURS } from '../lib/site'

/**
 * Five bars in the five colours the home screen fills with.
 *
 * The one piece of decoration on the page, and it is a quotation rather than an
 * invention: these are the accents the app actually draws, in slot order. It
 * says "five" before a single word does.
 */
const Bars = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.s2};

  span {
    height: 6px;
    flex: 1;
    max-width: 68px;
    border-radius: 3px;
  }
`

export function SlotBars({ className }: { className?: string }) {
  return (
    <Bars className={className} aria-hidden="true">
      {SLOT_COLOURS.map((colour) => (
        <span key={colour} style={{ background: colour }} />
      ))}
    </Bars>
  )
}
