import styled, { useTheme } from 'styled-components'
import MOCKUPS from '../lib/mockups.json'

/**
 * A device, as bezl drew it (`scripts/make-mockups.mjs`), in the reader's scheme.
 *
 * The app's two schemes are not inversions of each other, so each mockup is
 * rendered twice, from two captures, and this picks the file. The scheme comes
 * from the theme, which the inline script in `<head>` decided before the first
 * paint, so only one set is ever fetched.
 *
 * AVIF first, WebP after it, both with their alpha, at the widths the script
 * wrote; `sizes` says how wide the device is drawn so the browser can choose.
 * Width and height are always set, so nothing moves when it arrives.
 */

export type MockupName = keyof typeof MOCKUPS

const BASE = '/goals/mockups'

/** A transparent 1x1 GIF, inline: what a source that hides a device picks, so
 *  nothing is fetched for it. */
const NOTHING = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/**
 * A window has no frame of its own, and in the dark scheme its black content
 * meets the black page with no edge at all. A hairline over its corners gives
 * the edge back: the corner radius is 16 of the window's 1060 by 680 points,
 * written as a share of each side so it scales with the picture.
 */
const Ringed = styled.picture`
  position: relative;
  display: block;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.51% / 2.35%;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color.border};
    pointer-events: none;
  }
`

const Img = styled.img<{ $shadow: boolean }>`
  display: block;
  width: 100%;
  height: auto;
  filter: ${({ theme, $shadow }) => ($shadow ? theme.color.deviceShadow : 'none')};
  /* A device is a picture of a thing, not a link or text. */
  user-select: none;
  -webkit-user-drag: none;
`

export function Mockup({
  name,
  alt,
  sizes,
  priority = false,
  shadow = true,
  hiddenBelow,
  className,
}: {
  name: MockupName
  alt: string
  /** How wide the device is drawn, as an `<img sizes>` value. */
  sizes: string
  /** The hero's devices: fetched first, and never lazily. */
  priority?: boolean
  /** Widgets are flat on a Home Screen; devices stand on the page. */
  shadow?: boolean
  /**
   * A width below which the layout hides this device. Under it the picture
   * resolves to an inline blank, so a phone does not download a window it
   * never shows, even one marked `priority`.
   */
  hiddenBelow?: string
  className?: string
}) {
  const { mode } = useTheme()
  const { width, height, widths } = MOCKUPS[name]
  const srcset = (ext: 'avif' | 'webp') =>
    widths.map((w) => `${BASE}/${name}-${mode}-${w}.${ext} ${w}w`).join(', ')
  const fallback = `${BASE}/${name}-${mode}-${widths[widths.length - 1]}.webp`

  const Frame = name === 'mac' ? Ringed : 'picture'

  return (
    <Frame className={className}>
      {hiddenBelow && <source media={`not all and (min-width: ${hiddenBelow})`} srcSet={NOTHING} />}
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <Img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        $shadow={shadow}
      />
    </Frame>
  )
}
