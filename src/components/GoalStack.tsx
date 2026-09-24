import type { CSSProperties } from 'react'
import styled, { keyframes, useTheme } from 'styled-components'
import { SLOTS } from '../lib/site'

/**
 * The home screen, at the size of the page.
 *
 * Five full width blocks, one per slot, that fill the column exactly, so there
 * is visibly no room for a sixth. It is the one thing on the site that is not a
 * screenshot, and it is still a quotation rather than an illustration: the
 * titles, the numbers, the metadata line and both cuts of every colour are the
 * seeded app's own (see `SLOTS`). It is drawn so that it stays sharp at any
 * width and follows the page's scheme the moment the toggle is pressed.
 *
 * It keeps the block's whole vocabulary from DESIGN.md §7: the slot number top
 * right, the title with its metadata under it, and the progress rail in the
 * flow below. Everything on a block is ink in the canvas colour, because that
 * is what has contrast against a goal hue in either scheme (`GoalsOnColor`):
 * dark ink on the bright cut, light ink on the deep one.
 *
 * The page's one piece of motion lives here. The blocks arrive in slot order
 * and then each rail runs out to its reading, once, on load. Nothing else on
 * the page moves on its own, which is why this is allowed to.
 */

const rise = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
`

const run = keyframes`
  from {
    transform: scaleX(0);
  }
`

const Stack = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  gap: ${({ theme }) => theme.space.s2};
  height: min(calc(100svh - 64px - 96px), 860px);
  min-height: 600px;

  @media (max-width: ${({ theme }) => theme.bp.lg}) {
    height: auto;
    min-height: 0;
    grid-template-rows: none;
  }
`

const Block = styled.div`
  --ink: ${({ theme }) => theme.color.canvas};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.space.s2};
  padding: 0 ${({ theme }) => theme.space.s8};
  border-radius: ${({ theme }) => theme.radius.md};
  color: var(--ink);
  animation: ${rise} 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--slot) * 90ms);

  @media (max-width: ${({ theme }) => theme.bp.lg}) {
    min-height: 128px;
  }

  @media (max-width: ${({ theme }) => theme.bp.sm}) {
    min-height: 112px;
    padding: 0 ${({ theme }) => theme.space.s5};
  }
`

const SlotNumber = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.space.s4};
  right: ${({ theme }) => theme.space.s5};
  font-size: 0.8125rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: color-mix(in srgb, var(--ink) 52%, transparent);
`

const Title = styled.span`
  font-size: clamp(1.375rem, 2.3vw, 1.875rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
`

const Detail = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: color-mix(in srgb, var(--ink) 72%, transparent);

  @media (max-width: ${({ theme }) => theme.bp.sm}) {
    font-size: 0.8125rem;
  }
`

const Rail = styled.span`
  display: block;
  height: 6px;
  margin-top: ${({ theme }) => theme.space.s1};
  border-radius: 3px;
  background: color-mix(in srgb, var(--ink) 22%, transparent);
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: color-mix(in srgb, var(--ink) 92%, transparent);
    transform-origin: left center;
    animation: ${run} 1.1s cubic-bezier(0.3, 0.6, 0.2, 1) both;
    animation-delay: calc(500ms + var(--slot) * 90ms);
  }
`

export function GoalStack() {
  const { mode } = useTheme()
  return (
    <Stack
      role="img"
      aria-label="The Goals home screen: five goals filling five full width colour blocks. Run a marathon at 62 percent, Read 12 books at 25, Learn Spanish at 33, Learn sourdough not started, and Save $10,000 at 77."
    >
      {SLOTS.map((slot, index) => (
        <Block
          key={slot.title}
          aria-hidden="true"
          style={{ background: slot[mode], '--slot': index } as CSSProperties}
        >
          <SlotNumber>{String(index + 1).padStart(2, '0')}</SlotNumber>
          <Title>{slot.title}</Title>
          <Detail>
            {slot.progress}% · {slot.detail}
          </Detail>
          <Rail>
            <span style={{ width: `${slot.progress}%` }} />
          </Rail>
        </Block>
      ))}
    </Stack>
  )
}
