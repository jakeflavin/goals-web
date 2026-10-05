import styled from 'styled-components'
import { Reveal } from '../../components/Reveal'
import { Column, Eyebrow, Fine, H2, H3, Intro, Lead, Section } from '../../components/primitives'
import { FREE_INCLUDES, FREE_PLAN, PLUS_PLANS } from '../../lib/site'

/**
 * The price, as two cards: what is free, and Goals Plus, which is the same app
 * with no limit on goals, in its three forms.
 *
 * Two cards rather than four columns, because there are two plans and one of
 * them comes three ways. The yearly row carries the saving the app's own
 * paywall shows, and nothing else is marked.
 */

const Plans = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.s4};

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr 1fr;
  }
`

const PlanCard = styled.article<{ $plus?: boolean }>`
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.color.surface};
  padding: ${({ theme }) => theme.space.s8};
  /* Goals Plus wears the accent as a ring, the one thing on the page that
     says "this is the paid one" without saying it louder than that. */
  box-shadow: ${({ theme, $plus }) => ($plus ? `inset 0 0 0 2px ${theme.color.accent}` : 'none')};

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    padding: ${({ theme }) => theme.space.s10};
  }
`

const Amount = styled.p`
  margin: ${({ theme }) => theme.space.s5} 0 0;
  font-size: ${({ theme }) => theme.type.title};
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;

  small {
    margin-left: ${({ theme }) => theme.space.s2};
    font-size: ${({ theme }) => theme.type.body};
    font-weight: 400;
    letter-spacing: 0;
    color: ${({ theme }) => theme.color.textSecondary};
  }
`

const Note = styled.p`
  margin: ${({ theme }) => theme.space.s4} 0 0;
  color: ${({ theme }) => theme.color.textSecondary};
  text-wrap: pretty;
`

const Includes = styled.ul`
  margin: ${({ theme }) => theme.space.s8} 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: ${({ theme }) => theme.space.s3};

  li {
    display: flex;
    gap: ${({ theme }) => theme.space.s3};
    align-items: baseline;
  }

  li::before {
    content: '';
    flex: none;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.accent};
    transform: translateY(-0.1em);
  }
`

const Options = styled.ul`
  margin: ${({ theme }) => theme.space.s6} 0 0;
  padding: 0;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: ${({ theme }) => theme.space.s1} ${({ theme }) => theme.space.s4};
    padding: ${({ theme }) => theme.space.s5} 0;
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }

  li:last-child {
    padding-bottom: 0;
  }
`

const OptionName = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.s3};
  font-weight: 600;
`

const OptionPrice = styled.span`
  font-weight: 600;
  text-align: right;

  small {
    margin-left: ${({ theme }) => theme.space.s1};
    font-weight: 400;
    color: ${({ theme }) => theme.color.textSecondary};
  }
`

const OptionNote = styled.span`
  grid-column: 1 / -1;
  font-size: ${({ theme }) => theme.type.small};
  color: ${({ theme }) => theme.color.textSecondary};
`

const Badge = styled.span`
  padding: ${({ theme }) => theme.space.s1} ${({ theme }) => theme.space.s2};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.color.accent};
  color: ${({ theme }) => theme.color.ink};
  font-size: ${({ theme }) => theme.type.fine};
  font-weight: 600;
  line-height: 1.2;
`

const Footnote = styled(Fine)`
  margin-top: ${({ theme }) => theme.space.s8};
  max-width: ${({ theme }) => theme.measure};
`

export function Price() {
  return (
    <Section id="price" aria-labelledby="price-title">
      <Column>
        <Intro>
          <Reveal>
            <Eyebrow>Price</Eyebrow>
            <H2 id="price-title">One goal is free</H2>
            <Lead>
              Goals Plus is the same app with no limit on goals. On the free plan, drafts and
              finished goals count, and archived goals don&rsquo;t.
            </Lead>
          </Reveal>
        </Intro>

        <Plans>
          <Reveal>
            <PlanCard aria-labelledby="plan-free">
              <H3 id="plan-free">{FREE_PLAN.name}</H3>
              <Amount>
                <span>{FREE_PLAN.price}</span>
                <small>{FREE_PLAN.period}</small>
              </Amount>
              <Note>{FREE_PLAN.note}</Note>
              <Includes>
                {FREE_INCLUDES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Includes>
            </PlanCard>
          </Reveal>

          <Reveal delay={100}>
            <PlanCard $plus aria-labelledby="plan-plus">
              <H3 id="plan-plus">Goals Plus</H3>
              <Note>No limit on goals, and everything in Free.</Note>
              <Options>
                {PLUS_PLANS.map((plan) => (
                  <li key={plan.name}>
                    <OptionName>
                      {plan.name}
                      {plan.badge && <Badge>{plan.badge}</Badge>}
                    </OptionName>
                    <OptionPrice>
                      <span>{plan.price}</span>
                      <small>{plan.period}</small>
                    </OptionPrice>
                    <OptionNote>{plan.note}</OptionNote>
                  </li>
                ))}
              </Options>
            </PlanCard>
          </Reveal>
        </Plans>

        <Footnote>
          One purchase covers iPhone, iPad and Mac. The watch app, widgets, templates, history,
          export, sync and archiving are all on the free plan too.
        </Footnote>
      </Column>
    </Section>
  )
}
