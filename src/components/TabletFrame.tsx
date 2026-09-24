import styled, { useTheme } from 'styled-components'

/**
 * An iPad, drawn around its screenshot, in the same glass and metal as
 * `PhoneFrame`.
 *
 * The iPad's border is narrower than the phone's relative to its screen, and
 * its corners are gentler, so it gets its own ratios rather than the phone's
 * scaled up. A phone frame stretched to a tablet reads as a toy.
 *
 * The capture is portrait on purpose: in portrait the iPad still keeps the five
 * goals down the left and the open goal on the right, which is the whole point
 * of showing it.
 */

const Body = styled.div`
  width: 100%;
  position: relative;
  padding: 2.9%;
  border-radius: 6.2%/4.3%;
  background: ${({ theme }) => theme.color.glass};
  box-shadow: 0 0 0 1.5px ${({ theme }) => theme.color.rim};

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 3.6%/2.5%;
  }
`

export function TabletFrame({ alt, className }: { alt: string; className?: string }) {
  const { mode } = useTheme()
  return (
    <Body className={className}>
      <img
        src={`/goals/images/ipad-${mode}.png`}
        width={1000}
        height={1451}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </Body>
  )
}
