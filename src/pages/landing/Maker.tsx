import styled from 'styled-components'
import { Reveal } from '../../components/Reveal'
import { Body, Column, H3, Section } from '../../components/primitives'

/**
 * Who made it, signed. The human evidence a page with no reviews yet can
 * honestly offer: the developer, and the photograph the app's own paywall
 * shows, so the face on the site and the face in the app are one person.
 */

const Note = styled.figure`
  margin: 0 auto;
  max-width: 44rem;
  display: grid;
  gap: ${({ theme }) => theme.space.s6};
  justify-items: center;
  text-align: center;

  img {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    object-fit: cover;
  }

  ${Body} {
    margin-inline: auto;
    font-size: ${({ theme }) => theme.type.lead};
    line-height: 1.5;
  }
`

export function Maker() {
  return (
    <Section aria-labelledby="maker-title">
      <Column>
        <Reveal>
          <Note>
            <img
              src="/goals/images/jake.jpg"
              alt="Jake Flavin at the end of the marathon."
              width={88}
              height={88}
              loading="lazy"
            />
            <figcaption>
              <H3 id="maker-title">Who made it</H3>
              <Body>
                Hi, I&rsquo;m Jake, an indie developer. I make apps for the fun of it and keep them
                free or cheap wherever I can, so if Goals is useful to you, subscribing helps. The
                photo is from the marathon, the first goal I ever put in this app.
              </Body>
            </figcaption>
          </Note>
        </Reveal>
      </Column>
    </Section>
  )
}
