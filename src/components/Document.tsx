import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Column, H1, Section } from './primitives'

/**
 * The layout the privacy policy and the support page share.
 *
 * A single narrow column, because both are read rather than scanned. The header
 * and footer are the `Shell`'s, so this is only the document.
 */

const Narrow = styled(Column)`
  max-width: 720px;
`

const Title = styled(H1)`
  font-size: clamp(2.25rem, 5vw, 3rem);
  margin-bottom: ${({ theme }) => theme.space.s4};
`

const Standfirst = styled.p`
  margin: 0;
  font-size: 1.1875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textSecondary};
`

const Updated = styled.p`
  margin: ${({ theme }) => theme.space.s6} 0 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.textSecondary};
  font-variant-numeric: tabular-nums;
`

/**
 * The masthead brings no bottom padding of its own: the first heading below it
 * already carries its own top margin, and stacking the two left a hole between
 * the standfirst and the start of the document.
 */
const Masthead = styled(Section)`
  padding-bottom: 0;
`

const Body = styled.div`
  padding-bottom: ${({ theme }) => theme.space.s16};

  h2 {
    margin: ${({ theme }) => theme.space.s16} 0 ${({ theme }) => theme.space.s4};
    font-size: 1.375rem;
    line-height: 1.25;
    letter-spacing: -0.01em;
    font-weight: 700;
  }

  h2 + p {
    margin-top: 0;
  }

  p {
    margin: 0 0 ${({ theme }) => theme.space.s5};
    color: ${({ theme }) => theme.color.textSecondary};
  }

  ul {
    margin: 0 0 ${({ theme }) => theme.space.s5};
    padding-left: ${({ theme }) => theme.space.s5};
    color: ${({ theme }) => theme.color.textSecondary};
  }

  li {
    margin-bottom: ${({ theme }) => theme.space.s2};
  }

  a {
    color: ${({ theme }) => theme.color.accent};
    text-underline-offset: 3px;
  }

  strong {
    color: ${({ theme }) => theme.color.textPrimary};
    font-weight: 600;
  }
`

export function Document({
  title,
  standfirst,
  updated,
  children,
}: {
  title: string
  standfirst: string
  updated?: string
  children: ReactNode
}) {
  return (
    <Narrow>
      <Masthead>
        <Title>{title}</Title>
        <Standfirst>{standfirst}</Standfirst>
        {updated ? <Updated>Last updated {updated}.</Updated> : null}
      </Masthead>
      <Body>{children}</Body>
    </Narrow>
  )
}
