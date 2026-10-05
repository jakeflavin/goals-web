import styled, { keyframes, useTheme } from 'styled-components'
import { Cta } from '../../components/Cta'
import { Mockup } from '../../components/Mockup'
import { Reveal } from '../../components/Reveal'
import { Column, Fine, H1, Lead } from '../../components/primitives'

/**
 * What the app is, in a sentence, over the app itself on every device it runs
 * on: the Mac window at the back, the iPhone in front of its right edge, and
 * the watch in front of its left.
 *
 * On a phone the window would be a thumbnail, so it goes, and the iPhone and
 * the watch stand alone, the iPhone fading into the page a little way down so
 * the call to action is still on the first screen.
 *
 * The devices settle in one after another on load, a beat apart, which is the
 * only motion on the page that does not wait to be scrolled to.
 */

const settle = keyframes`
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
`

const Wrap = styled.section`
  padding: ${({ theme }) => theme.space.s16} 0 ${({ theme }) => theme.space.section};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    padding-top: ${({ theme }) => theme.space.s20};
  }
`

const Copy = styled.div`
  text-align: center;

  ${Lead} {
    margin-inline: auto;
  }
`

const Actions = styled.div`
  margin-top: ${({ theme }) => theme.space.s8};
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Fine} {
    margin-top: ${({ theme }) => theme.space.s4};
  }
`

/**
 * The composition. On a phone it is as tall as the iPhone, less the part that
 * fades; from a small tablet up it is a fixed shape the three devices are
 * placed in by percentage, so it scales as one picture.
 */
const Stage = styled.div`
  position: relative;
  margin: ${({ theme }) => theme.space.s16} auto 0;
  width: min(100%, 22rem);
  -webkit-mask-image: linear-gradient(to bottom, #000 62%, transparent 96%);
  mask-image: linear-gradient(to bottom, #000 62%, transparent 96%);

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    width: 100%;
    aspect-ratio: 1200 / 700;
    -webkit-mask-image: none;
    mask-image: none;
  }
`

const Device = styled.div<{ $delay: number }>`
  animation: ${settle} 1.2s cubic-bezier(0.19, 1, 0.22, 1) ${({ $delay }) => $delay}ms both;
`

const Mac = styled(Device)`
  display: none;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: block;
    position: absolute;
    top: 0;
    left: 7%;
    width: 76%;
  }
`

const Phone = styled(Device)`
  position: relative;
  width: 78%;
  margin-left: auto;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    position: absolute;
    right: 3%;
    bottom: 0;
    width: 21.5%;
  }
`

const Watch = styled(Device)`
  position: absolute;
  left: 0;
  top: 30%;
  width: 36%;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    top: auto;
    left: 1%;
    bottom: 3%;
    width: 12.5%;
  }
`

export function Hero() {
  const theme = useTheme()

  return (
    <Wrap aria-labelledby="hero-title">
      <Column>
        <Copy>
          <Reveal>
            <H1 id="hero-title">A goal tracker for the year</H1>
          </Reveal>
          <Reveal delay={80}>
            <Lead>
              Each goal holds a plan for getting there, and once you lock it in, Goals shows whether
              it is on track.
            </Lead>
          </Reveal>
          <Reveal delay={160}>
            <Actions>
              <Cta />
              <Fine>For iPhone, iPad, Mac and Apple Watch. One goal free, with no time limit.</Fine>
            </Actions>
          </Reveal>
        </Copy>

        <Stage>
          <Mac $delay={200}>
            <Mockup
              name="mac"
              priority
              hiddenBelow={theme.bp.md}
              sizes="(min-width: 1248px) 912px, 76vw"
              alt="Goals on a Mac: the goals down the left of the window, and Run a marathon open beside them with its milestones, tasks and habit."
            />
          </Mac>
          <Phone $delay={360}>
            <Mockup
              name="home"
              priority
              sizes="(min-width: 1248px) 258px, (min-width: 760px) 21.5vw, 70vw"
              alt="Home on an iPhone: Run a marathon, Read 12 books, Learn Spanish, Learn sourdough and Save $10,000, each a colour block with its progress."
            />
          </Phone>
          <Watch $delay={500}>
            <Mockup
              name="watch"
              sizes="(min-width: 1248px) 150px, (min-width: 760px) 12.5vw, 32vw"
              alt="Goals on an Apple Watch, showing three goal blocks with their progress."
            />
          </Watch>
        </Stage>
      </Column>
    </Wrap>
  )
}
