import styled from 'styled-components'

/**
 * The Apple Watch, drawn around its screenshot, on the same principle as
 * `PhoneFrame`: the watch canvas is black and so is this page in dark mode, so
 * without a case the screen has no edge.
 *
 * The watch has no light mode, so unlike the phone there is one capture rather
 * than two.
 */
const Case = styled.div`
  width: 100%;
  max-width: 236px;
  margin-inline: auto;
  padding: 5.5%;
  border-radius: 28%/24%;
  background: ${({ theme }) => theme.color.bezel};
  box-shadow:
    inset 0 0 0 1px ${({ theme }) => theme.color.bezelEdge},
    0 0 0 1px ${({ theme }) => theme.color.border};

  img {
    width: 100%;
    height: auto;
    border-radius: 22%/19%;
  }
`

export function WatchFrame({ alt }: { alt: string }) {
  return (
    <Case>
      <img src="/goals/images/watch.png" width={416} height={496} alt={alt} loading="lazy" />
    </Case>
  )
}
