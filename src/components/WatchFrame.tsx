import styled from 'styled-components'

/**
 * The Apple Watch, drawn around its screenshot, on the same principle as
 * `PhoneFrame`: black glass and one band of metal, because the watch canvas is
 * black and so is this page in dark mode, and without a case the screen has no
 * edge.
 *
 * The watch has no light mode, so unlike the phone there is one capture rather
 * than two.
 */
const Case = styled.div`
  width: 100%;
  max-width: 220px;
  margin-inline: auto;
  padding: 6%;
  border-radius: 30%/25%;
  background: ${({ theme }) => theme.color.glass};
  box-shadow: 0 0 0 1.5px ${({ theme }) => theme.color.rim};

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
