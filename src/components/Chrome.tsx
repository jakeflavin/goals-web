import styled from 'styled-components'
import { Mark } from './Mark'
import { Column } from './primitives'
import { CONTACT_EMAIL } from '../lib/site'

/**
 * The header and footer, identical on all three pages.
 *
 * Both are quiet on purpose. The header is a wordmark and two links; there is
 * no navigation to build because there are only three pages, and a page with
 * three pages in it does not need a menu.
 */

const Bar = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`

const BarInner = styled(Column)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.s5};
  height: 68px;
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

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.s6};
  font-size: 0.9375rem;

  a {
    color: ${({ theme }) => theme.color.textSecondary};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.color.text};
  }
`

export function Header({ current }: { current?: 'privacy' | 'support' }) {
  return (
    <Bar>
      <BarInner>
        <Wordmark href="/goals/">
          <Mark size={26} title="Goals" />
          Goals
        </Wordmark>
        <Links>
          <a href="/goals/privacy/" aria-current={current === 'privacy' ? 'page' : undefined}>
            Privacy
          </a>
          <a href="/goals/support/" aria-current={current === 'support' ? 'page' : undefined}>
            Support
          </a>
        </Links>
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
    color: ${({ theme }) => theme.color.text};
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
