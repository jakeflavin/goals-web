import styled, { css } from 'styled-components'
import { Mockup, type MockupName } from '../../components/Mockup'
import { Reveal } from '../../components/Reveal'
import {
  Body,
  Card,
  Column,
  Eyebrow,
  H2,
  H3,
  Intro,
  Lead,
  Section,
} from '../../components/primitives'
import { PaceCard } from './PaceCard'

/**
 * What a goal is made of, as a grid of cards: one part of a goal per card, a
 * heading and a sentence or two, and the screen that shows it running off the
 * bottom edge.
 *
 * Six columns on a laptop, so the cards can be a third or two thirds wide:
 * milestones get the wide one, because the route is the picture a reader
 * remembers. Two columns on a tablet, one on a phone.
 */

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.s4};

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: repeat(6, 1fr);
  }
`

const Cell = styled(Reveal)<{ $span: 'wide' | 'third' }>`
  display: flex;

  > * {
    flex: 1;
  }

  ${({ $span, theme }) =>
    $span === 'wide'
      ? css`
          @media (min-width: ${theme.bp.md}) {
            grid-column: span 2;
          }
          @media (min-width: ${theme.bp.lg}) {
            grid-column: span 4;
          }
        `
      : css`
          @media (min-width: ${theme.bp.lg}) {
            grid-column: span 2;
          }
        `}
`

const FeatureCard = styled(Card)<{ $wide?: boolean }>`
  min-height: 34rem;

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    min-height: 38rem;
    ${({ $wide }) =>
      $wide &&
      css`
        flex-direction: row;
        gap: ${({ theme }) => theme.space.s10};

        > :first-child {
          flex: 1;
          align-self: center;
          padding-bottom: ${({ theme }) => theme.space.s10};
        }
      `}
  }
`

/** The screen, running off the bottom of the card. */
const Screen = styled.div<{ $wide?: boolean }>`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space.s8};
  width: min(80%, 18rem);
  align-self: center;
  /* Lower than the card is tall, so the bottom of the phone is cut by the
     card's edge rather than shown whole. */
  /* A share of the phone's own width (the frame is about twice as tall as it
     is wide), so the same part of the screen shows whatever the card's width. */
  margin-bottom: calc(min(80%, 18rem) * -0.475);

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    ${({ $wide }) =>
      $wide &&
      css`
        width: 19rem;
        margin-bottom: -6rem;
        align-self: flex-end;
      `}
  }
`

type Part = {
  key: string
  title: string
  body: string
  span: 'wide' | 'third'
  screen?: { name: MockupName; alt: string }
}

const PARTS: readonly Part[] = [
  {
    key: 'milestones',
    title: 'Milestones',
    body: 'Milestones are the checkpoints on the way, drawn in order as a route. When a goal has both, milestones carry 70% of its progress and tasks the other 30%.',
    span: 'wide',
    screen: {
      name: 'detail',
      alt: 'Run a marathon open on an iPhone at 62% and on track, with its milestones drawn as a route from 5K to Race day: three done and the next one in progress.',
    },
  },
  {
    key: 'tasks',
    title: 'Tasks',
    body: 'Tasks are the steps that only need doing once, like buying the shoes or booking the race. The Tasks page gathers them from every goal.',
    span: 'third',
    screen: {
      name: 'tasks',
      alt: "The Tasks page on an iPhone, with each goal's tasks grouped under its name.",
    },
  },
  {
    key: 'habits',
    title: 'Habits',
    body: 'Each time a habit comes due, it is recorded once, as done or missed. Its streak counts back from the last record, so a day that is not over yet never breaks it.',
    span: 'third',
    screen: {
      name: 'habit',
      alt: 'The Run habit on an iPhone: a current streak of 3 days, a longest of 6, 63 completions and 70% over the last 90 days.',
    },
  },
  {
    key: 'lockin',
    title: 'Lock in',
    body: 'A draft tracks nothing, so it can be reshaped freely. Locking it in sets a target date, and from then on a mark on the progress bar shows where the goal should be by now.',
    span: 'third',
  },
  {
    key: 'archive',
    title: 'Archive',
    body: 'Archive keeps a goal whole, history included, and sets it aside to look back on. An archived goal stops counting toward the free plan, and Unarchive brings it back at the end of Home.',
    span: 'third',
    screen: {
      name: 'archived',
      alt: 'An archived goal open on an iPhone: Learn sourdough, marked Archived, with its tasks and habit kept and an Unarchive button.',
    },
  },
]

export function Inside() {
  return (
    <Section id="inside" aria-labelledby="inside-title">
      <Column>
        <Intro>
          <Reveal>
            <Eyebrow>Inside a goal</Eyebrow>
            <H2 id="inside-title">What a goal is made of</H2>
            <Lead>
              Each goal holds milestones, tasks and habits. There are 56 templates to start from, in
              seven categories.
            </Lead>
          </Reveal>
        </Intro>

        <Grid>
          {PARTS.map((part, index) => (
            <Cell key={part.key} $span={part.span} delay={(index % 3) * 70}>
              {part.screen ? (
                <FeatureCard $wide={part.span === 'wide'}>
                  <div>
                    <H3>{part.title}</H3>
                    <Body>{part.body}</Body>
                  </div>
                  <Screen $wide={part.span === 'wide'}>
                    <Mockup
                      name={part.screen.name}
                      alt={part.screen.alt}
                      sizes="(min-width: 980px) 304px, (min-width: 760px) 40vw, 80vw"
                    />
                  </Screen>
                </FeatureCard>
              ) : (
                <PaceCard title={part.title} body={part.body} />
              )}
            </Cell>
          ))}
        </Grid>
      </Column>
    </Section>
  )
}
