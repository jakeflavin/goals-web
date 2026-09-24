import styled, { useTheme } from 'styled-components'

/**
 * The Mac, in two pieces: its window, and its menu bar panel.
 *
 * Neither gets a laptop drawn around it. A Mac app is a window, not a device,
 * and a MacBook bezel would be a photograph of the wrong thing. The window is
 * the capture the app takes of itself (`-snapshot-to`), traffic lights and bar
 * included, so the only thing drawn here is the edge macOS gives every window:
 * a large corner and a hairline.
 */

const Window = styled.div`
  width: 100%;
  border-radius: 2.2%/3.4%;
  overflow: hidden;
  background: ${({ theme }) => theme.color.canvas};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.color.borderStrong};

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

export function WindowFrame({ alt, className }: { alt: string; className?: string }) {
  const { mode } = useTheme()
  return (
    <Window className={className}>
      <img
        src={`/goals/images/mac-${mode}.png`}
        width={1600}
        height={1026}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </Window>
  )
}

/**
 * The menu bar panel, hanging from a strip of menu bar.
 *
 * The panel alone is a tall card with no context, and could be a phone
 * screenshot. The strip is what says where it lives: the app's monochrome icon
 * in a menu bar, selected, with the panel dropped from it. The capture is the
 * panel rendering itself with its own rounded corners, so the corners here are
 * its transparency rather than a mask.
 */

const Hang = styled.div`
  display: grid;
  justify-items: end;
  width: 100%;
  max-width: 320px;
  margin-inline: auto;
`

const Bar = styled.div`
  justify-self: stretch;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  padding: 0 ${({ theme }) => theme.space.s3};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.textSecondary};
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  gap: ${({ theme }) => theme.space.s4};
`

/** The item, highlighted the way macOS highlights an open menu. */
const Item = styled.span`
  display: grid;
  place-items: center;
  width: 30px;
  height: 22px;
  border-radius: 6px;
  background: ${({ theme }) => theme.color.surfaceAlt};
  color: ${({ theme }) => theme.color.textPrimary};
`

const Panel = styled.img`
  width: 100%;
  height: auto;
  margin-top: ${({ theme }) => theme.space.s2};
  border-radius: 5%/2.5%;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.color.borderStrong};
`

/** The icon as it sits in the menu bar: the tick alone, in the bar's ink. */
function Glyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m7.2 12.3 3.3 3.3 6.4-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MenuBarFrame({ alt }: { alt: string }) {
  const { mode } = useTheme()
  return (
    <Hang>
      <Bar aria-hidden="true">
        <Item>
          <Glyph />
        </Item>
        <span>9:41</span>
      </Bar>
      <Panel
        src={`/goals/images/menubar-${mode}.png`}
        width={562}
        height={1146}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </Hang>
  )
}
