import styled from 'styled-components'
import { Mark } from './Mark'
import { Cta } from './Cta'
import { ThemeToggle } from './ThemeToggle'
import { Column } from './primitives'
import { CONTACT_EMAIL } from '../lib/site'
import type { Mode } from '../theme'

/**
 * The header and footer, identical on all three pages.
 *
 * The header carries the wordmark, the scheme toggle and the download button,
 * and nothing else. There is no navigation to build: there are three pages, and
 * a site with three pages does not need a menu. The download button is here so
 * that a reader who decides at any point on the page can act without scrolling.
 */

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.color.canvas};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`

const BarInner = styled(Column)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.s4};
  height: 64px;
`

const Wordmark = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.s3};
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.s4};

  /* Under 560px the download button and the toggle fight for the same room.
     The button is the one that has a second copy further down the page. */
  @media (max-width: 560px) {
    a[href*='apps.apple'],
    p {
      display: none;
    }
  }
`

export function Header({
  mode,
  onChangeMode,
}: {
  mode: Mode
  onChangeMode: (mode: Mode) => void
}) {
  return (
    <Bar>
      <BarInner>
        <Wordmark href="/goals/">
          <Mark size={26} title="Goals" />
          Goals
        </Wordmark>
        <Right>
          <ThemeToggle mode={mode} onChange={onChangeMode} />
          <Cta size="sm" />
        </Right>
      </BarInner>
    </Bar>
  )
}

const FootBar = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding: ${({ theme }) => theme.space.s10} 0;
  color: ${({ theme }) => theme.color.textSecondary};
  font-size: 0.9375rem;
`

const FootInner = styled(Column)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.s5};

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.s6};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.color.textPrimary};
  }
`

export function Footer() {
  return (
    <FootBar>
      <FootInner>
        <nav>
          <a href="/goals/">Goals</a>
          <a href="/goals/privacy/">Privacy</a>
          <a href="/goals/support/">Support</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </nav>
        <span>Made by Jake Flavin.</span>
      </FootInner>
    </FootBar>
  )
}
