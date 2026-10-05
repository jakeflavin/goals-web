import styled from 'styled-components'
import { Reveal } from '../../components/Reveal'
import { Body, Column, Eyebrow, H2 } from '../../components/primitives'

/**
 * Privacy, on the opposite ground: the one full width change of scheme on the
 * page, so the middle of it turns, and the claim that matters most to a
 * privacy first app is the one that looks different.
 *
 * Three plain statements and the link to the policy. No badges and no
 * shields; the App Store's own label is the evidence, and the heading quotes
 * it.
 */

const Band = styled.section`
  background: ${({ theme }) => theme.color.inverse};
  color: ${({ theme }) => theme.color.inverseText};
  padding: ${({ theme }) => theme.space.section} 0;

  ${Eyebrow} {
    color: ${({ theme }) => theme.color.inverseAccent};
  }
`

const Statements = styled.dl`
  margin: ${({ theme }) => theme.space.s12} 0 0;
  display: grid;
  gap: ${({ theme }) => theme.space.s8};

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.space.s10};
  }

  div {
    padding-top: ${({ theme }) => theme.space.s5};
    border-top: 1px solid ${({ theme }) => theme.color.inverseBorder};
  }

  dt {
    font-size: ${({ theme }) => theme.type.small};
    color: ${({ theme }) => theme.color.inverseSecondary};
  }

  dd {
    margin: 0;
  }

  ${Body} {
    margin-top: ${({ theme }) => theme.space.s2};
    color: ${({ theme }) => theme.color.inverseText};
  }
`

const Policy = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.space.s10};
  font-size: ${({ theme }) => theme.type.body};
  font-weight: 600;
  color: ${({ theme }) => theme.color.inverseAccent};
  text-underline-offset: 4px;
`

const STATEMENTS = [
  {
    key: 'account',
    label: 'Account',
    body: 'There is nothing to sign up for, and Goals has no server of its own.',
  },
  {
    key: 'data',
    label: 'Data',
    body: 'Goals has no analytics and no telemetry, and nothing you write in it is sent to me.',
  },
  {
    key: 'sync',
    label: 'Sync',
    body: 'Sync goes through the private iCloud database of your Apple Account, which I have no way to see, and Settings can switch it off.',
  },
] as const

export function PrivacyBand() {
  return (
    <Band aria-labelledby="privacy-title">
      <Column>
        <Reveal>
          <Eyebrow>Privacy</Eyebrow>
          <H2 id="privacy-title">The privacy label says Data Not Collected</H2>
        </Reveal>
        <Reveal delay={100}>
          <Statements>
            {STATEMENTS.map((statement) => (
              <div key={statement.key}>
                <dt>{statement.label}</dt>
                <dd>
                  <Body>{statement.body}</Body>
                </dd>
              </div>
            ))}
          </Statements>
          <Policy href="/goals/privacy/">Read the privacy policy</Policy>
        </Reveal>
      </Column>
    </Band>
  )
}
