import styled, { useTheme } from 'styled-components'

/**
 * An iPhone, drawn around a screenshot.
 *
 * The screenshots are of an app whose canvas is true black in dark mode and
 * pure white in light mode, and this site's canvas is the same two colours. So
 * a bare screenshot has no edge: in dark mode the goal blocks appear to float
 * loose on the page, and in light mode the whole screen dissolves. The frame is
 * what says where the phone stops.
 *
 * It is drawn rather than photographed: a bezel, a bright edge to catch the
 * light, and the two button nubs that make the silhouette read as a phone at a
 * glance. No drop shadow, no reflection gradient, no hand holding it. The
 * screenshots already carry their own status bar and Dynamic Island, so none of
 * that is faked here either.
 */

const Bezel = styled.div<{ $width: string }>`
  width: 100%;
  max-width: ${({ $width }) => $width};
  margin-inline: auto;
  position: relative;
  padding: 2.6%;
  border-radius: 13%/6.2%;
  background: ${({ theme }) => theme.color.bezel};
  /* The bright edge. A frame with no edge reads as a grey rectangle rather than
     as hardware, and this is one hairline rather than a bevel of gradients. */
  box-shadow:
    inset 0 0 0 1px ${({ theme }) => theme.color.bezelEdge},
    0 0 0 1px ${({ theme }) => theme.color.border};

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10.6%/5.1%;
  }
`

/** The side buttons. Silhouette only, and never in the way of the screen. */
const Buttons = styled.span`
  position: absolute;
  inset: 0;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background: ${({ theme }) => theme.color.bezel};
    filter: brightness(0.86);
    border-radius: 2px;
  }

  /* Volume up and down, on the left. */
  &::before {
    left: -2px;
    top: 20%;
    height: 15%;
  }

  /* The side button, on the right, and lower. */
  &::after {
    right: -2px;
    top: 26%;
    height: 12%;
  }
`

/**
 * A screenshot that follows the reader's scheme.
 *
 * Both cuts are captured from the running app, so the phone on the page is in
 * the same mode as the page around it. Swapping the file rather than filtering
 * the image is the only honest way to do this: the app's two schemes are not
 * inversions of each other, and an inverted screenshot would show a product
 * that does not exist.
 */
export function PhoneFrame({
  shot,
  alt,
  width = '300px',
  priority = false,
}: {
  shot: string
  alt: string
  width?: string
  priority?: boolean
}) {
  const { mode } = useTheme()
  return (
    <Bezel $width={width}>
      <Buttons aria-hidden="true" />
      <img
        src={`/goals/images/${shot}-${mode}.png`}
        width={720}
        height={1565}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </Bezel>
  )
}
