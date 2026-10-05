import type { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'
import { useInView } from '../hooks/useInView'

/**
 * Lets something settle into place as it comes into view: a fade and a short
 * rise, once, and never again on the way back up.
 *
 * The motion is the page's one easing (a long ease out, the curve of something
 * coming to rest) at one length. Nothing slides in sideways, nothing scales,
 * and nothing tracks the scroll position past the first sight of it, because
 * the point is that the page feels considered, not that it performs.
 *
 * Shown at once, with no motion, when the reader has asked for reduced motion
 * (`useInView`).
 */

const Wrap = styled.div<{ $shown: boolean }>`
  opacity: ${({ $shown }) => ($shown ? 1 : 0)};
  transform: translateY(${({ $shown }) => ($shown ? '0' : '1rem')});
  transition:
    opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1) var(--delay, 0ms),
    transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) var(--delay, 0ms);

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  /** For a row of cards: each one a beat after the last. */
  delay?: number
  className?: string
}) {
  const [ref, shown] = useInView<HTMLDivElement>()

  return (
    <Wrap
      ref={ref}
      className={className}
      $shown={shown}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Wrap>
  )
}
