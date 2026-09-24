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
 * It is drawn the way the phone is built: black glass around the screen in both
 * schemes, because the glass is black whatever the page is, and one band of
 * metal around the glass. The band is the only line that changes with the
 * scheme, and it is what makes the silhouette read as hardware on a black page
 * and on a white one. It used to be a grey bezel that turned light with the
 * page, which read as a placeholder rather than as a phone.
 *
 * No drop shadow, no reflection gradient, no hand holding it. The screenshots
 * already carry their own status bar and Dynamic Island, so none of that is
 * faked here either.
 */

const Body = styled.div<{ $width: string }>`
  width: 100%;
  max-width: ${({ $width }) => $width};
  margin-inline: auto;
  position: relative;
  padding: 3.2%;
  border-radius: 14%/6.6%;
  background: ${({ theme }) => theme.color.glass};
  box-shadow: 0 0 0 1.5px ${({ theme }) => theme.color.rim};

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 11%/5.1%;
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
    width: 3px;
    background: ${({ theme }) => theme.color.rim};
    border-radius: 2px;
  }

  /* Volume up and down, on the left. */
  &::before {
    left: -4px;
    top: 20%;
    height: 14%;
  }

  /* The side button, on the right, and lower. */
  &::after {
    right: -4px;
    top: 26%;
    height: 11%;
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
    <Body $width={width}>
      <Buttons aria-hidden="true" />
      <img
        src={`/goals/images/${shot}-${mode}.png`}
        width={720}
        height={1565}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </Body>
  )
}
