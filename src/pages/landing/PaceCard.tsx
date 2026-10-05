import styled from 'styled-components'
import { Body, Card, H3 } from '../../components/primitives'
import { useInView } from '../../hooks/useInView'

/**
 * Lock in, drawn rather than captured: the top of a locked goal's page, at the
 * size of a card, with the progress bar and the pace mark that only a locked
 * goal has.
 *
 * Every value is the seeded Run a marathon's, read off its page in the app: 62%
 * complete, on track, the mark just short of the fill. The fill runs out to 62%
 * when the card comes into view, which is the one place on the page a number
 * moves, and it moves because that is what the bar does in the app as things
 * are ticked off.
 *
 * The colour is the app's orange, in its two cuts (`goal` in the theme): the
 * deepened one under white type on the white page, and the bright one under
 * black type on the black page.
 */

const PROGRESS = 62
const PACE = 58

const Header = styled.div`
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.space.s8};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.color.goal};
  color: ${({ theme }) => theme.color.onGoal};

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    margin-bottom: ${({ theme }) => theme.space.s10};
  }
`

const Meta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.type.fine};
  font-weight: 600;
  /* Softened only on the bright cut: on the deepened one white at 80% fails
     AA against the orange. */
  opacity: ${({ theme }) => (theme.mode === 'light' ? 1 : 0.8)};
`

const Title = styled.p`
  margin: ${({ theme }) => theme.space.s2} 0 ${({ theme }) => theme.space.s5};
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
`

const Track = styled.div`
  position: relative;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  /* The track is the type colour at a fifth, as the app draws it. */
  background: color-mix(in srgb, currentColor 22%, transparent);
`

const Fill = styled.div<{ $shown: boolean }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $shown }) => ($shown ? `${PROGRESS}%` : '0%')};
  border-radius: inherit;
  background: currentColor;
  transition: width 1.6s cubic-bezier(0.19, 1, 0.22, 1) 0.2s;
`

/** Where the goal should be by now: a tick across the bar. */
const Pace = styled.div`
  position: absolute;
  left: ${PACE}%;
  top: -5px;
  bottom: -5px;
  width: 2px;
  border-radius: 1px;
  background: currentColor;
`

const Reading = styled.p`
  margin: ${({ theme }) => theme.space.s4} 0 0;
  font-size: ${({ theme }) => theme.type.small};
  font-weight: 600;
  opacity: ${({ theme }) => (theme.mode === 'light' ? 1 : 0.85)};
`

const Tall = styled(Card)`
  min-height: 34rem;

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    min-height: 38rem;
  }
`

export function PaceCard({ title, body }: { title: string; body: string }) {
  const [ref, shown] = useInView<HTMLDivElement>()

  return (
    <Tall>
      <div>
        <H3>{title}</H3>
        <Body>{body}</Body>
      </div>
      <Header
        ref={ref}
        role="img"
        aria-label="The top of Run a marathon once it is locked in: 90 days left, the progress bar at 62% with the pace mark just behind it, and the reading 62% complete, on track."
      >
        <Meta aria-hidden="true">Goal 01 · locked in May 18 · 90 days left</Meta>
        <Title aria-hidden="true">Run a marathon</Title>
        <Track aria-hidden="true">
          <Fill $shown={shown} />
          <Pace />
        </Track>
        <Reading aria-hidden="true">62% complete · on track</Reading>
      </Header>
    </Tall>
  )
}
