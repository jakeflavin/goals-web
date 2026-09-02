import styled, { useTheme } from 'styled-components'
import { Cta } from '../components/Cta'
import { PhoneFrame } from '../components/PhoneFrame'
import { WatchFrame } from '../components/WatchFrame'
import { SlotBars } from '../components/SlotBars'
import {
  Band,
  Column,
  Eyebrow,
  Grid,
  H1,
  H2,
  H3,
  Items,
  Panel,
  Prose,
  Rule,
  Section,
  Split,
} from '../components/primitives'
import { PLANS, SMALL_FEATURES } from '../lib/site'

/**
 * The landing page.
 *
 * It is built to be read top to bottom by somebody who has never heard of the
 * app and has to end up understanding it well enough to decide. So the order is
 * an argument rather than a feature list: what it is, why the limit is the
 * point, how a goal is made, the three things a goal is made of, where it shows
 * up when the phone is in a pocket, what it costs, and who wrote it.
 *
 * The pitch is the approved App Store description in the same voice, because
 * they describe the same product to the same person and two different pitches
 * would mean one of them is wrong.
 *
 * Every picture is a screenshot of the app running with its `-seed` launch
 * argument, captured twice so the phone on the page is in the same scheme as
 * the page around it. No mockups, no renders, no invented data.
 */

// ---------------------------------------------------------------- hero

const Hero = styled(Section)`
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: ${({ theme }) => theme.space.s16};
  align-items: center;
  padding-top: ${({ theme }) => theme.space.s16};

  @media (max-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.s12};
  }
`

const HeroBars = styled(SlotBars)`
  margin: ${({ theme }) => theme.space.s6} 0;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space.s5};
  margin-top: ${({ theme }) => theme.space.s8};
`

const Fineprint = styled.p`
  margin: ${({ theme }) => theme.space.s4} 0 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.textSecondary};
`

// ---------------------------------------------------------------- the argument

/**
 * The pull quote that carries the product opinion.
 *
 * It is the largest type on the page after the headline and it is the only
 * place the page raises its voice, because the scarcity is the whole reason
 * this app exists rather than one of its features.
 */
const Statement = styled.p`
  margin: 0;
  max-width: 22ch;
  font-size: clamp(2rem, 4.4vw, 3.25rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 700;

  span {
    color: ${({ theme }) => theme.color.textSecondary};
  }
`

const StatementLayout = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.s16};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.s12};
  }
`

// ---------------------------------------------------------------- steps

/**
 * The three steps, drawn as the app's own milestone track.
 *
 * This was three columns with a 2px accent rule over each and 01/02/03 above
 * them, which is the house style of every SaaS page ever built and said nothing
 * about this product. The track is the app's real vocabulary: milestones are
 * nodes joined by a connector, and the whole point of them is that they read as
 * a route rather than a list. Making a goal is a route too.
 *
 * The accent appears as three dots rather than three rules, which is most of
 * why the quiet version is quieter.
 *
 * It runs across on a wide screen and down on a narrow one, and down is the
 * orientation the app itself draws, so the phone version of this section looks
 * like a screen from the thing it is describing.
 */
const Track = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.s8};

  li {
    position: relative;
    padding-top: ${({ theme }) => theme.space.s8};
  }

  /* The node. */
  li::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.accent};
  }

  /* The connector, reaching across the gap to the next node. */
  li:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 13px;
    right: calc(-1 * ${({ theme }) => theme.space.s8});
    height: 1px;
    background: ${({ theme }) => theme.color.borderStrong};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.textSecondary};
    font-size: 0.9375rem;
  }

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.s6};

    li {
      padding-top: 0;
      padding-left: ${({ theme }) => theme.space.s8};
    }

    li::before {
      top: 6px;
    }

    li:not(:last-child)::after {
      top: 19px;
      bottom: calc(-1 * ${({ theme }) => theme.space.s6});
      left: 6px;
      right: auto;
      width: 1px;
      height: auto;
    }
  }
`

// ---------------------------------------------------------------- habits

/** Two phones, because the habit list and one habit's history are two halves of
 *  the same answer and neither says it alone. */
const Pair = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.s8};
  align-items: start;
  margin-top: ${({ theme }) => theme.space.s12};

  figure {
    margin: 0;
  }

  /* The second phone sits lower, so the pair reads as an arrangement rather
     than as two things that failed to line up. */
  figure:last-child {
    margin-top: ${({ theme }) => theme.space.s12};
  }

  /* Without a cap these fill half the column each, which draws a phone wider
     than the one in your hand. */
  > figure > div {
    max-width: 340px;
  }

  /* Two phones side by side on a phone is two phones nobody can read: at 390px
     they land at about 170px each. Stacked and capped, they stay legible. */
  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.s8};

    figure:last-child {
      margin-top: 0;
    }

    > figure > div {
      max-width: 280px;
    }
  }
`

// ---------------------------------------------------------------- surfaces

const Surfaces = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: ${({ theme }) => theme.space.s4};

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr;
  }
`

const SurfaceCard = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s8};

  /* The two cards are different heights and the grid stretches them level. The
     picture takes the slack evenly above and below rather than all of it above,
     which is what left the watch stranded at the foot of its card. */
  > *:last-child {
    margin-block: auto;
  }

  h3 {
    margin: 0 0 ${({ theme }) => theme.space.s2};
    font-size: 1.25rem;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.textSecondary};
    font-size: 0.9375rem;
  }
`

/** The widget shot is a crop of a real home screen, not a device, so it gets a
 *  frame of its own rather than a bezel. */
const HomeScreen = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.color.border};
`

/** iOS dims the wallpaper and turns the widgets dark with the system, so this
 *  follows the scheme for the same reason every phone on the page does. */
function WidgetShot() {
  const { mode } = useTheme()
  return (
    <HomeScreen
      src={`/goals/images/widgets-${mode}.jpg`}
      width={860}
      height={891}
      alt="An iPhone home screen with two Goals widgets on it: a task list and one goal's progress."
      loading="lazy"
    />
  )
}

// ---------------------------------------------------------------- price

const Tiers = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space.s4};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.bp.sm}) {
    grid-template-columns: 1fr;
  }
`

const Tier = styled.div<{ $featured: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.s6};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $featured }) =>
    $featured ? theme.color.surface : 'transparent'};
  border: 1px solid
    ${({ theme, $featured }) => ($featured ? theme.color.accent : theme.color.border)};

  h3 {
    margin: 0;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.textSecondary};
  }

  ul {
    list-style: none;
    margin: ${({ theme }) => theme.space.s5} 0 0;
    padding: 0;
    display: grid;
    gap: ${({ theme }) => theme.space.s2};
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.color.textSecondary};
  }

  li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: ${({ theme }) => theme.space.s2};
    align-items: start;
  }

  svg {
    width: 14px;
    height: 14px;
    /* Lines the tick up with the cap height of the first line beside it. */
    margin-top: ${({ theme }) => theme.space.s1};
    color: ${({ theme }) => theme.color.accent};
  }
`

const Price = styled.p`
  margin: ${({ theme }) => theme.space.s4} 0 0;
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;

  span {
    display: block;
    margin-top: ${({ theme }) => theme.space.s2};
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0;
    color: ${({ theme }) => theme.color.textSecondary};
  }
`

const TierNote = styled.p`
  margin: ${({ theme }) => theme.space.s4} 0 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.color.textSecondary};
`

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: ${({ theme }) => theme.space.s5};
  transform: translateY(-50%);
  padding: ${({ theme }) => theme.space.s1} ${({ theme }) => theme.space.s3};
  border-radius: 999px;
  background: ${({ theme }) => theme.color.accent};
  color: ${({ theme }) => theme.color.ink};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 12.5 5.5 5.5L20 6.5" />
    </svg>
  )
}

// ---------------------------------------------------------------- signature

const Signature = styled(Panel)`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: ${({ theme }) => theme.space.s6};
  align-items: start;
  max-width: 720px;

  img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.bp.sm}) {
    grid-template-columns: 1fr;
  }
`

// ---------------------------------------------------------------- closing

const Closing = styled(Section)`
  text-align: center;

  h2 {
    max-width: 18ch;
    margin-inline: auto;
  }

  p {
    margin-inline: auto;
  }
`

// ---------------------------------------------------------------- the page

export function Landing() {
  return (
    <>
      <Column>
        <Hero>
          <div>
            <H1>Five goals. One year.</H1>
            <HeroBars />
            <Prose $lead>
              Goals is a goal tracker for iPhone and Apple Watch with five slots for the year.
              The limit is the point. Most goal apps let you pile up wishes until the list stops
              meaning anything. Goals makes you pick.
            </Prose>
            <Actions>
              <Cta />
            </Actions>
            <Fineprint>
              iPhone and Apple Watch, iOS 26 or later. One goal free, with no time limit.
            </Fineprint>
          </div>
          <figure style={{ margin: 0 }}>
            <PhoneFrame
              shot="home"
              width="290px"
              priority
              alt="The Goals home screen: five full width colour blocks, one for each goal, each showing its title and how far along it is."
            />
          </figure>
        </Hero>
      </Column>

      <Band>
        <Column>
          <StatementLayout>
            <Statement>
              You get five. <span>Not six.</span>
            </Statement>
            <div>
              <Prose>
                Choosing what goes in a slot is the work this app exists to make you do. The home
                screen is five full width blocks that fill the screen exactly, so there is
                visibly no room for another one.
              </Prose>
              <Prose>
                Everything else in the app follows from that. A goal is worth a milestone track
                and a habit schedule because there are only ever five of them.
              </Prose>
            </div>
          </StatementLayout>
        </Column>
      </Band>

      <Column>
        <Section>
          <Eyebrow>How a goal is made</Eyebrow>
          <H2>Shape it first. Then commit.</H2>
          <Prose>
            A goal is a draft until you lock it in, and a draft tracks nothing. That gap is
            deliberate: it is the difference between writing something down and deciding to do
            it.
          </Prose>
          <Track>
            <li>
              <H3>Pick the slot</H3>
              <p>
                Name the goal and give it a colour. It lands in one of five blocks on the home
                screen and it is yours for the year.
              </p>
            </li>
            <li>
              <H3>Shape the plan</H3>
              <p>
                Add milestones, tasks and habits. Rearrange them, delete the whole thing, start
                over. Nothing is being tracked yet.
              </p>
            </li>
            <li>
              <H3>Lock it in</H3>
              <p>
                Set a target date and commit. The plan freezes, the habits start coming due, and
                the progress bar starts telling the truth.
              </p>
            </li>
          </Track>
        </Section>
      </Column>

      <Rule />

      <Column>
        <Section>
          <Split $pictureFirst>
            <figure>
              <PhoneFrame
                shot="detail"
                alt="A goal called Run a marathon, locked in, at 62 percent and on track, showing a milestone track with three checkpoints done and one in progress."
              />
            </figure>
            <div>
              <Eyebrow>Milestones</Eyebrow>
              <H2>A route, not a to do list.</H2>
              <Prose>
                Milestones are the checkpoints a goal actually passes through, joined in order so
                they read as a route. 5K, 10K, half marathon, the long run, race day. You can see
                where you are on it without counting anything.
              </Prose>
              <Prose>
                They carry most of a goal&rsquo;s progress, because finishing a checkpoint is
                worth more than ticking an errand. Progress is 70% milestones and 30% tasks, and
                when there is nothing to measure yet it says nothing rather than zero.
              </Prose>
              <Items>
                <div>
                  <H3>Pace</H3>
                  <dd>
                    A mark on the bar for where you should be by now, and a reading that says on
                    track, or how far behind.
                  </dd>
                </div>
              </Items>
            </div>
          </Split>
        </Section>
      </Column>

      <Rule />

      <Column>
        <Section>
          <Split>
            <div>
              <Eyebrow>Tasks</Eyebrow>
              <H2>The errands that stand in the way.</H2>
              <Prose>
                Not everything on the way to a goal is a milestone. Buy the shoes. Book the race.
                Open the account. Tasks are the one off things that have to happen, and they are
                done when they are done.
              </Prose>
              <Prose>
                One screen collects them across all five goals, grouped by goal and tinted in its
                colour, so a spare ten minutes has somewhere to go without opening anything.
              </Prose>
            </div>
            <figure>
              <PhoneFrame
                shot="tasks"
                alt="The tasks screen, showing every goal's tasks grouped under its name, each group tinted in that goal's colour."
              />
            </figure>
          </Split>
        </Section>
      </Column>

      <Rule />

      <Column>
        <Section>
          <Eyebrow>Habits</Eyebrow>
          <H2>The part you actually do every day.</H2>
          <Prose $lead>
            Habits are the engine. Daily, weekly, or a set number of times a week. Every period
            writes exactly one row, done or missed, and that record is what streaks and history
            are built from.
          </Prose>
          <Grid>
            <div>
              <H3>Streaks that do not lie</H3>
              <dd>
                A streak counts back from the last day you logged, not from today, so a day you
                have not got to yet never breaks one. A habit that was paused is never recorded
                as missed.
              </dd>
            </div>
            <div>
              <H3>The whole history</H3>
              <dd>
                Every habit keeps its current streak, its longest, its completions and its rate
                over the last ninety days, with the days themselves underneath.
              </dd>
            </div>
          </Grid>
          <Pair>
            <figure>
              <PhoneFrame
                width="100%"
                shot="habits"
                alt="The habits screen, showing today and the days before it, each habit tagged with the colour of the goal it belongs to."
              />
            </figure>
            <figure>
              <PhoneFrame
                width="100%"
                shot="habitdetail"
                alt="One habit's detail screen, showing a three day current streak, a six day longest streak, 63 completions and 70 percent over the last ninety days."
              />
            </figure>
          </Pair>
        </Section>
      </Column>

      <Band>
        <Column>
          <Section>
            <Eyebrow>Off the phone</Eyebrow>
            <H2>On your wrist and on your home screen.</H2>
            <Prose>
              Most of using this app is checking one thing off. That should not need the app.
            </Prose>
            <Surfaces>
              <SurfaceCard>
                <div>
                  <h3>Apple Watch</h3>
                  <p>
                    Your goals and the habits due today, tickable from the wrist. Complications
                    put one on the watch face.
                  </p>
                </div>
                <WatchFrame alt="The Goals watch app, showing three goal blocks with their progress." />
              </SurfaceCard>
              <SurfaceCard>
                <div>
                  <h3>Widgets</h3>
                  <p>
                    Home screen and Lock Screen, in every size: one goal and its progress, what
                    is left to do, or the habits still due today. Check things off without
                    opening anything.
                  </p>
                </div>
                <WidgetShot />
              </SurfaceCard>
            </Surfaces>
          </Section>
        </Column>
      </Band>

      <Column>
        <Section>
          <Eyebrow>And the rest</Eyebrow>
          <H2>Everything else it does.</H2>
          <Grid>
            {SMALL_FEATURES.map((feature) => (
              <div key={feature.name}>
                <H3>{feature.name}</H3>
                <dd>{feature.detail}</dd>
              </div>
            ))}
          </Grid>
        </Section>
      </Column>

      <Rule />

      <Column>
        <Section>
          <Eyebrow>Privacy</Eyebrow>
          <H2>Nothing leaves the device.</H2>
          <Prose $lead>
            There is no account and no sign up. Nothing is collected, nothing is tracked, and
            nothing is sent anywhere. Your goals are stored on your phone, and the only way
            anything gets out is if you export it yourself.
          </Prose>
          <Prose>
            The App Store privacy label for Goals says Data Not Collected, and that is the whole
            of it. <a href="/goals/privacy/">Read the privacy policy</a>.
          </Prose>
        </Section>
      </Column>

      <Band>
        <Column>
          <Section>
            <Eyebrow>Price</Eyebrow>
            <H2>One goal is free. Five is the subscription.</H2>
            <Prose>
              The subscription gates exactly one thing: how many goals you can have locked in at
              once. The watch app, the widgets, the templates, the history and the export are
              free, and they stay free.
            </Prose>
            <Tiers>
              {PLANS.map((plan) => (
                <Tier key={plan.name} $featured={Boolean(plan.featured)}>
                  {plan.badge ? <Badge>{plan.badge}</Badge> : null}
                  <h3>{plan.name}</h3>
                  <Price>
                    {plan.price}
                    <span>{plan.period}</span>
                  </Price>
                  <TierNote>{plan.note}</TierNote>
                  <ul>
                    {plan.includes.map((line) => (
                      <li key={line}>
                        <Tick />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Tier>
              ))}
            </Tiers>
          </Section>
        </Column>
      </Band>

      <Column>
        <Section>
          <Eyebrow>Who made it</Eyebrow>
          <Signature>
            <img
              src="/goals/images/jake.jpg"
              width={400}
              height={400}
              alt="Jake Flavin at the end of a race."
              loading="lazy"
            />
            <div>
              <Prose>
                Hi, I&rsquo;m Jake. I&rsquo;m an indie developer. I make apps for the fun of it
                and put them out into the world, and I keep them free or cheap wherever I can. If
                Goals is useful to you, subscribing helps. Thanks.
              </Prose>
              <Prose>
                The photo is from the marathon. It is also the first goal I ever put in this app.
              </Prose>
            </div>
          </Signature>
        </Section>
      </Column>

      <Rule />

      <Column>
        <Closing>
          <H2>Pick five things and give them a year.</H2>
          <Prose $lead style={{ maxWidth: '46ch' }}>
            The first one is free, with no trial to run out. Choosing what it is takes longer
            than downloading the app.
          </Prose>
          <Actions style={{ justifyContent: 'center' }}>
            <Cta />
          </Actions>
        </Closing>
      </Column>
    </>
  )
}
