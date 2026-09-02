import styled from 'styled-components'
import { Header, Footer } from '../components/Chrome'
import {
  Column,
  Eyebrow,
  H1,
  H2,
  H3,
  Panel,
  Prose,
  Rule,
  Section,
  Shot,
} from '../components/primitives'
import {
  APP_STORE_URL,
  IS_ON_THE_APP_STORE,
  PLANS,
  SLOT_COLOURS,
} from '../lib/site'

/**
 * The landing page.
 *
 * The pitch is the App Store description's, in the same voice, because they are
 * the same product being described to the same person and two different pitches
 * would mean one of them is wrong.
 *
 * The pictures are screenshots of the app running with `-seed`, not mockups and
 * not renders. That is the portfolio's rule for cover images and it holds here
 * for the same reason: a graphic about an app says nothing about using one.
 */

const Hero = styled(Section)`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: ${({ theme }) => theme.space.s16};
  align-items: center;
  /* Less air above than a section in the middle of the page: the header is
     already 68px of it, and the headline belongs near the top of the fold. */
  padding-top: ${({ theme }) => theme.space.s16};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.s10};
  }
`

/** The one decorative element on the page: five bars, in the five slot colours. */
const Slots = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.s2};
  margin: ${({ theme }) => theme.space.s6} 0 ${({ theme }) => theme.space.s6};

  span {
    height: 6px;
    flex: 1;
    max-width: 64px;
    border-radius: 3px;
  }
`

/**
 * One element, two states, and they are deliberately not the same weight.
 *
 * Live, this is the only thing on the page anybody came to press, so it takes
 * the accent fill and the ink that pairs with it. Before the app is approved
 * there is nothing to press, so it drops to an outline in secondary ink and
 * stops looking like a promise it cannot keep.
 */
const Availability = styled.a<{ $live: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.s3};
  margin: ${({ theme }) => theme.space.s6} 0 0;
  padding: ${({ theme }) => theme.space.s3} ${({ theme }) => theme.space.s5};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $live }) => ($live ? theme.color.accent : 'transparent')};
  border: 1px solid ${({ theme, $live }) => ($live ? 'transparent' : theme.color.border)};
  color: ${({ theme, $live }) => ($live ? theme.color.ink : theme.color.textSecondary)};
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
`

const Requirement = styled.p`
  margin: ${({ theme }) => theme.space.s4} 0 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.textSecondary};
`

/** Text on one side, a screenshot on the other, alternating down the page. */
const Split = styled.div<{ $shotFirst?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.s16};
  align-items: center;

  > figure {
    margin: 0;
    order: ${({ $shotFirst }) => ($shotFirst ? -1 : 0)};
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.s10};

    > figure {
      order: 0;
    }
  }
`

/**
 * A screenshot is a phone, so it should not grow to the width of a laptop.
 *
 * These are full length shots rather than crops, and a phone is close to twice
 * as tall as it is wide, so the width is what keeps the picture from being the
 * whole section. 300px is a phone at roughly three quarters life size.
 */
const ShotFrame = styled.figure`
  max-width: 300px;
  margin-inline: auto;
`

/**
 * The hero's shot, narrower again.
 *
 * The home screen has to be shown whole: five blocks filling the screen exactly,
 * with visibly no room for a sixth, is the entire product opinion, and a crop of
 * it would be a picture of four goals and an argument nobody can see. So it is
 * the width that gives, not the height.
 */
const HeroShot = styled(ShotFrame)`
  max-width: 268px;
`

const Items = styled.dl`
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.space.s6};

  div {
    padding-top: ${({ theme }) => theme.space.s6};
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.color.textSecondary};
  }
`

const Grid = styled(Items)`
  grid-template-columns: 1fr 1fr;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const Plans = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.s4};
  margin-bottom: ${({ theme }) => theme.space.s8};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const Plan = styled(Panel)`
  padding: ${({ theme }) => theme.space.s6};

  h3 {
    margin: 0 0 ${({ theme }) => theme.space.s3};
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.textSecondary};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.textSecondary};
    font-size: 0.9375rem;
  }
`

const Price = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.text};
  font-variant-numeric: tabular-nums;
`

const Signature = styled(Panel)`
  max-width: 62ch;

  p:last-child {
    margin-bottom: 0;
  }
`

function AppStoreNote() {
  if (IS_ON_THE_APP_STORE) {
    return (
      <Availability href={APP_STORE_URL} $live>
        Download on the App Store
      </Availability>
    )
  }
  // Not a link, and not a disabled one either: there is nothing to go to yet, so
  // it states the fact and stays out of the tab order.
  return (
    <Availability as="p" $live={false}>
      Coming to the App Store
    </Availability>
  )
}

export function Landing() {
  return (
    <>
      <Header />
      <main>
        <Column>
          <Hero>
            <div>
              <H1>Five goals. One year.</H1>
              <Slots aria-hidden="true">
                {SLOT_COLOURS.map((colour) => (
                  <span key={colour} style={{ background: colour }} />
                ))}
              </Slots>
              <Prose $lead>
                Goals is a goal tracker for iPhone and Apple Watch with five slots for the year.
                The limit is the point. Most goal apps let you pile up wishes until the list
                stops meaning anything. Goals makes you pick.
              </Prose>
              <AppStoreNote />
              <Requirement>iPhone and Apple Watch. iOS 26 or later.</Requirement>
            </div>
            <HeroShot>
              <Shot
                src="/goals/images/home.png"
                width={804}
                height={1748}
                alt="The Goals home screen: five full width colour blocks, one for each goal, each showing its title and how far along it is."
              />
            </HeroShot>
          </Hero>
        </Column>

        <Rule />

        <Column>
          <Section>
            <Split>
              <div>
                <Eyebrow>Drafts</Eyebrow>
                <H2>Shape it first. Then commit.</H2>
                <Prose>
                  A goal starts as a draft. While it is a draft you can shape it however you
                  want: add milestones, tasks and habits, rearrange them, delete the whole thing
                  and start over. Nothing is tracked yet.
                </Prose>
                <Prose>
                  When you are sure, you lock it in. The plan freezes, the target date is set,
                  and tracking starts. Choosing what goes in a slot is the work this app exists
                  to make you do.
                </Prose>
              </div>
              <ShotFrame>
                <Shot
                  src="/goals/images/detail.png"
                  width={804}
                  height={1748}
                  alt="A goal called Run a marathon, locked in, at 62 percent and on track, with a milestone track, a task list and a habit."
                />
              </ShotFrame>
            </Split>
          </Section>
        </Column>

        <Rule />

        <Column>
          <Section>
            <Eyebrow>Inside a goal</Eyebrow>
            <H2>Three ways to say what it takes.</H2>
            <Prose>
              Progress comes from what has actually happened. When there is nothing to measure
              yet, the app says nothing rather than zero.
            </Prose>
            <Grid>
              <div>
                <H3>Milestones</H3>
                <dd>
                  The checkpoints, joined in order so they read as a route rather than a list.
                  Most of a goal&rsquo;s progress is these.
                </dd>
              </div>
              <div>
                <H3>Tasks</H3>
                <dd>One off things that have to happen. Checked off as they get done.</dd>
              </div>
              <div>
                <H3>Habits</H3>
                <dd>
                  Daily, weekly, or a set number of times a week. Each one keeps a streak and a
                  history you can look back through.
                </dd>
              </div>
              <div>
                <H3>Pace</H3>
                <dd>
                  A mark on the bar for where you should be by now, and a reading that says on
                  track, or how far behind.
                </dd>
              </div>
            </Grid>
          </Section>
        </Column>

        <Rule />

        <Column>
          <Section>
            <Split $shotFirst>
              <ShotFrame>
                <Shot
                  src="/goals/images/habits.png"
                  width={804}
                  height={1748}
                  alt="The habits screen, showing today and the days before it, each habit tagged with the colour of the goal it belongs to."
                />
              </ShotFrame>
              <div>
                <Eyebrow>Every day</Eyebrow>
                <H2>Checking things off is the whole job.</H2>
                <Prose>
                  Habits come due on the schedule you set. Every period writes one row, done or
                  missed, and that record is what streaks and history are built from. A streak
                  walks back from the last day you logged, so a day you have not got to yet
                  never breaks one.
                </Prose>
                <Prose>
                  The rest of the time the app stays out of the way. It states a reading and
                  stops.
                </Prose>
              </div>
            </Split>
          </Section>
        </Column>

        <Rule />

        <Column>
          <Section>
            <Eyebrow>Everywhere else</Eyebrow>
            <H2>On the wrist, on the home screen, in search.</H2>
            <Grid>
              <div>
                <H3>Apple Watch</H3>
                <dd>Habits due today, tickable from the wrist. Complications on the face.</dd>
              </div>
              <div>
                <H3>Widgets</H3>
                <dd>Home screen and Lock Screen, in every size.</dd>
              </div>
              <div>
                <H3>Siri and Shortcuts</H3>
                <dd>Check off a habit, or ask what is due.</dd>
              </div>
              <div>
                <H3>Spotlight</H3>
                <dd>Goals and habits are indexed, so search finds them.</dd>
              </div>
              <div>
                <H3>Templates</H3>
                <dd>
                  Seven categories of goal shapes to start from, editable before you commit to
                  one.
                </dd>
              </div>
              <div>
                <H3>Export</H3>
                <dd>Everything you have written, as Markdown, whenever you want it.</dd>
              </div>
            </Grid>
          </Section>
        </Column>

        <Rule />

        <Column>
          <Section>
            <Eyebrow>Privacy</Eyebrow>
            <H2>Nothing leaves the device.</H2>
            <Prose>
              There is no account and no sign up. Nothing is collected, nothing is tracked, and
              nothing is sent anywhere. Your goals are stored on your phone, and the only way
              anything gets out is if you export it yourself.
            </Prose>
            <Prose>
              The App Store privacy label for Goals says Data Not Collected, and that is the
              whole of it. <a href="/goals/privacy/">Read the privacy policy</a>.
            </Prose>
          </Section>
        </Column>

        <Rule />

        <Column>
          <Section>
            <Eyebrow>Price</Eyebrow>
            <H2>One goal is free. Five is the subscription.</H2>
            <Prose>
              The first goal slot is free with no time limit. A subscription unlocks all five,
              paid monthly, yearly, or once.
            </Prose>
            <Plans>
              {PLANS.map((plan) => (
                <Plan key={plan.name}>
                  <h3>{plan.name}</h3>
                  <Price>{plan.price}</Price>
                  <p>{plan.note}</p>
                </Plan>
              ))}
            </Plans>
            <Prose>
              The subscription gates exactly one thing: how many goals you can have locked in at
              once. The watch app, the widgets, the templates, the history and the export are
              free, and they stay free.
            </Prose>
          </Section>
        </Column>

        <Rule />

        <Column>
          <Section>
            <Eyebrow>Who made it</Eyebrow>
            <Signature>
              <Prose>
                Hi, I&rsquo;m Jake. I&rsquo;m an indie developer. I make apps for the fun of it
                and put them out into the world, and I keep them free or cheap wherever I can.
                If Goals is useful to you, subscribing helps. Thanks.
              </Prose>
            </Signature>
          </Section>
        </Column>
      </main>
      <Footer />
    </>
  )
}
