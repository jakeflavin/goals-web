import styled from 'styled-components'
import { Reveal } from '../../components/Reveal'
import { Body, Column, Eyebrow, H2, Lead, Section } from '../../components/primitives'

/**
 * AI agents on the Mac, kept to one section because they are a convenience,
 * not the product. The three statements are the rules a cautious reader asks
 * about first, each under a small label rather than a bold lead-in.
 */

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.s12};

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: 1.05fr 0.95fr;
    gap: ${({ theme }) => theme.space.s16};
    align-items: start;
  }
`

const Rules = styled.dl`
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.space.s6};

  div {
    padding-top: ${({ theme }) => theme.space.s5};
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }

  dt {
    font-size: ${({ theme }) => theme.type.small};
    color: ${({ theme }) => theme.color.textSecondary};
  }

  dd {
    margin: 0;
  }

  ${Body} {
    margin-top: ${({ theme }) => theme.space.s2};
    color: ${({ theme }) => theme.color.textPrimary};
  }
`

const RULES = [
  {
    key: 'off',
    label: 'Off by default',
    body: 'Allow AI agents lets an agent read, and Allow changes lets it write. Both start off.',
  },
  {
    key: 'ask',
    label: 'Asks first',
    body: 'Locking in, unlocking, resetting and deleting always ask first, and a question left unanswered for 45 seconds is a no.',
  },
  {
    key: 'local',
    label: 'Local',
    body: 'An agent reaches Goals through a helper on the same Mac, and Goals has no web address. The AI app itself may send what it reads to the company that runs it.',
  },
] as const

export function Agents() {
  return (
    <Section aria-labelledby="agents-title">
      <Column>
        <Layout>
          <Reveal>
            <Eyebrow>On the Mac</Eyebrow>
            <H2 id="agents-title">AI agents can help with the plan</H2>
            <Lead>
              The Mac app can act as a local MCP server, so an AI app such as Claude Desktop or
              Cursor can read your goals and, with changes allowed, add tasks or log a habit.
            </Lead>
          </Reveal>
          <Reveal delay={120}>
            <Rules>
              {RULES.map((rule) => (
                <div key={rule.key}>
                  <dt>{rule.label}</dt>
                  <dd>
                    <Body>{rule.body}</Body>
                  </dd>
                </div>
              ))}
            </Rules>
          </Reveal>
        </Layout>
      </Column>
    </Section>
  )
}
