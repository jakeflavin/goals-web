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

/**
 * Every screen Goals runs on, one card each, with the device in it.
 *
 * A grid on a laptop, where the Mac window gets two thirds of a row and runs
 * off the card's right edge, because a window cut by its frame reads as a
 * window rather than a thumbnail. Two columns on a tablet. On a phone a grid of
 * six would be six screens of scrolling, so the cards become a row that scrolls
 * sideways and stops on each one, with the next one showing at the edge.
 */

const Track = styled.div`
  /* A phone: one row, scrolled sideways, bleeding to both edges of the screen. */
  display: flex;
  gap: ${({ theme }) => theme.space.s4};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: ${({ theme }) => theme.space.gutter};
  margin-inline: calc(-1 * ${({ theme }) => theme.space.gutter});
  padding: 0 ${({ theme }) => theme.space.gutter} ${({ theme }) => theme.space.s4};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Focusable, so the row can be scrolled from a keyboard; the ring goes
     inside, because the row runs to the screen's edges. */
  &:focus-visible {
    outline-offset: -2px;
  }

  > * {
    flex: 0 0 min(84%, 22rem);
    scroll-snap-align: start;
  }

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow: visible;
    margin-inline: 0;
    padding: 0;

    > * {
      flex: none;
    }
  }

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Cell = styled(Reveal)<{ $span: 1 | 2 | 3 }>`
  display: flex;

  > * {
    flex: 1;
  }

  ${({ $span, theme }) =>
    $span > 1 &&
    css`
      @media (min-width: ${theme.bp.md}) {
        grid-column: span 2;
      }
      @media (min-width: ${theme.bp.lg}) {
        grid-column: span ${$span};
      }
    `}
`

const DeviceCard = styled(Card)`
  min-height: 30rem;

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    min-height: 34rem;
  }
`

/** How a device sits in its card: centred and cut by the bottom edge, or, for
 *  the window, pushed out past the right one too. */
const Picture = styled.div<{ $fit: 'phone' | 'tablet' | 'watch' | 'panel' | 'window' }>`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space.s8};
  align-self: center;

  ${({ $fit, theme }) => {
    switch ($fit) {
      case 'phone':
        return css`
          width: min(72%, 15rem);
          margin-bottom: -30%;
        `
      case 'tablet':
        return css`
          width: min(88%, 22rem);
          margin-bottom: -26%;
        `
      case 'watch':
        return css`
          width: min(46%, 9.5rem);
          margin-bottom: -18%;
        `
      case 'panel':
        return css`
          width: min(66%, 14rem);
          margin-bottom: -40%;
        `
      // On a phone the card is narrow, so the window is drawn well past its
      // right edge to stay readable; from a tablet up it needs far less.
      case 'window':
        return css`
          align-self: flex-start;
          width: 210%;
          margin-bottom: -40%;

          @media (min-width: ${theme.bp.md}) {
            width: 128%;
            margin-bottom: -12%;
          }
        `
    }
  }}
`

/** The widgets, on the dark ground of a Home Screen in both schemes, which is
 *  where a widget is ever seen and where both of them can be read. */
const WidgetCard = styled(Card)`
  background: ${({ theme }) => theme.color.inverse};
  color: ${({ theme }) => theme.color.inverseText};
  padding-bottom: ${({ theme }) => theme.space.s8};

  ${Body} {
    color: ${({ theme }) => theme.color.inverseSecondary};
  }

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    padding-bottom: ${({ theme }) => theme.space.s10};

    > :first-child {
      flex: 1;
    }
  }
`

const Widgets = styled.div`
  margin-top: ${({ theme }) => theme.space.s8};
  display: grid;
  grid-template-columns: 2.13fr 1fr;
  gap: ${({ theme }) => theme.space.s4};
  align-items: start;

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    margin-top: 0;
    flex: 1.3;
  }
`

type Device = {
  key: string
  title: string
  body: string
  span: 1 | 2
  mockup: MockupName
  fit: 'phone' | 'tablet' | 'watch' | 'panel' | 'window'
  sizes: string
  alt: string
}

const DEVICES: readonly Device[] = [
  {
    key: 'mac',
    title: 'Mac',
    body: "The window has the iPad's two columns, and the Dock badge counts the habits still due today.",
    span: 2,
    mockup: 'mac',
    fit: 'window',
    sizes: '(min-width: 980px) 920px, (min-width: 760px) 112vw, 131vw',
    alt: 'The Goals window on a Mac: the goals down the left, and Run a marathon open beside them.',
  },
  {
    key: 'menubar',
    title: 'Menu bar',
    body: 'The whole app drops down from the menu bar at phone width, and it can run there with no Dock icon.',
    span: 1,
    mockup: 'menubar',
    fit: 'panel',
    sizes: '(min-width: 760px) 224px, 60vw',
    alt: 'The Goals panel from the menu bar, with tabs for Goals, Tasks and Habits above the goal blocks.',
  },
  {
    key: 'ipad',
    title: 'iPad',
    body: 'Home and the open goal sit side by side, and ⌘1 to ⌘9 open the first nine goals from a keyboard.',
    span: 1,
    mockup: 'ipad',
    fit: 'tablet',
    sizes: '(min-width: 760px) 352px, 76vw',
    alt: 'Goals on an iPad: the goals in a column on the left, and Run a marathon open on the right.',
  },
  {
    key: 'iphone',
    title: 'iPhone',
    body: 'Siri can read out how a goal is going, and tick off a habit.',
    span: 1,
    mockup: 'habits',
    fit: 'phone',
    sizes: '(min-width: 760px) 240px, 62vw',
    alt: "The Habits page on an iPhone: today's habits ticked off, and the days before them with each one done or missed.",
  },
  {
    key: 'watch',
    title: 'Apple Watch',
    body: 'Milestones, tasks and habits can be checked off from the wrist, and there are seven complications for the watch face.',
    span: 1,
    mockup: 'watch',
    fit: 'watch',
    sizes: '(min-width: 760px) 152px, 40vw',
    alt: 'The Goals app on an Apple Watch, showing three goal blocks with their progress.',
  },
]

export function Devices() {
  return (
    <Section id="devices" aria-labelledby="devices-title">
      <Column>
        <Intro>
          <Reveal>
            <Eyebrow>Devices</Eyebrow>
            <H2 id="devices-title">The same goals on every screen</H2>
            <Lead>
              iPhone, iPad and Mac keep in step through your own private iCloud, so a habit ticked
              off on one is ticked off on all of them. The watch reads from the iPhone it is paired
              with.
            </Lead>
          </Reveal>
        </Intro>

        <Track role="region" aria-label="Devices" tabIndex={0}>
          {DEVICES.map((device, index) => (
            <Cell key={device.key} $span={device.span} delay={(index % 3) * 70}>
              <DeviceCard>
                <div>
                  <H3>{device.title}</H3>
                  <Body>{device.body}</Body>
                </div>
                <Picture $fit={device.fit}>
                  <Mockup name={device.mockup} alt={device.alt} sizes={device.sizes} />
                </Picture>
              </DeviceCard>
            </Cell>
          ))}
          <Cell $span={3} delay={140}>
            <WidgetCard>
              <div>
                <H3>Widgets</H3>
                <Body>
                  Widgets put a goal or a list on the Home Screen or the Mac desktop, and habits can
                  be ticked off from the Today&rsquo;s habits widget.
                </Body>
              </div>
              <Widgets>
                <Mockup
                  name="widget-tasks"
                  shadow={false}
                  sizes="(min-width: 980px) 380px, (min-width: 760px) 58vw, 56vw"
                  alt="The Tasks widget: two tasks still to do, Plan taper from Run a marathon and Build a starter from Learn sourdough."
                />
                <Mockup
                  name="widget-goal"
                  shadow={false}
                  sizes="(min-width: 980px) 180px, (min-width: 760px) 27vw, 26vw"
                  alt="The goal widget for Run a marathon: 3 of 5 milestones and 2 of 3 tasks, 62% complete."
                />
              </Widgets>
            </WidgetCard>
          </Cell>
        </Track>
      </Column>
    </Section>
  )
}
