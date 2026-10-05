import styled from 'styled-components'
import { Mark } from './Mark'
import { Cta } from './Cta'
import { ThemeToggle } from './ThemeToggle'
import { Column } from './primitives'
import { useScrolled } from '../hooks/useScrolled'
import { CONTACT_EMAIL } from '../lib/site'
import type { Mode } from '../theme'

/**
 * The header and footer, identical on all three pages.
 *
 * The header carries the wordmark, the scheme toggle and the download button,
 * and from a tablet up, links to the landing page's three main sections. There
 * is no menu to open: three pages and three sections do not need one, and a
 * phone gets the wordmark and the toggle and nothing to dismiss.
 *
 * It has no ground of its own over the top of the page, so the hero reads as
 * one picture, and takes a frosted one with a hairline once the page has
 * scrolled under it.
 */

const Bar = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme, $scrolled }) => ($scrolled ? theme.color.barGlass : 'transparent')};
  border-bottom: 1px solid ${({ theme, $scrolled }) => ($scrolled ? theme.color.border : 'transparent')};
  -webkit-backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'saturate(180%) blur(20px)' : 'none')};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'saturate(180%) blur(20px)' : 'none')};
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
`

const BarInner = styled(Column)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.s4};
  height: 64px;
`

/** The landing page's sections, by name. Absolute, so they work from the
 *  privacy and support pages too. Hidden on a phone, where there is no room
 *  beside the wordmark and the page is one thumb's scroll anyway. */
const Nav = styled.nav`
  display: none;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: flex;
    gap: ${({ theme }) => theme.space.s8};
    margin-inline: auto;
  }

  a {
    font-size: ${({ theme }) => theme.type.small};
    color: ${({ theme }) => theme.color.textSecondary};
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.color.textPrimary};
  }
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

  /* On a phone the download button and the toggle fight for the same room.
     The button is the one that has a second copy further down the page. */
  > :last-child {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.bp.sm}) {
    > :last-child {
      display: inline-flex;
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
  const scrolled = useScrolled()

  return (
    <Bar $scrolled={scrolled}>
      <BarInner>
        <Wordmark href="/goals/">
          <Mark size={26} />
          Goals
        </Wordmark>
        <Nav aria-label="Sections">
          <a href="/goals/#inside">How it works</a>
          <a href="/goals/#devices">Devices</a>
          <a href="/goals/#price">Price</a>
        </Nav>
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
