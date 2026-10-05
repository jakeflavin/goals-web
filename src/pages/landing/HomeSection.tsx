import styled from 'styled-components'
import { Mockup } from '../../components/Mockup'
import { Reveal } from '../../components/Reveal'
import { Column, Eyebrow, H2, Lead, Section } from '../../components/primitives'

/**
 * Home, and the one rule about it that changed: there is no cap. One goal is
 * free and Goals Plus holds any number, and Home is the goals in order and one
 * "Set a goal" block after the last, which is the picture here.
 *
 * Words on the left and the phone on a lifted ground on the right, running off
 * the bottom of it; stacked on anything narrower than a laptop.
 */

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.s12};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.space.s16};
  }
`

const Ground = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.color.surface};
  padding: ${({ theme }) => theme.space.s12} ${({ theme }) => theme.space.s8} 0;
`

/* The phone runs off the bottom edge by a share of its own width, so the cut
   falls in the same place at every size: below the Set a goal block, through
   the bottom of the screen. */
const Phone = styled.div`
  width: min(78%, 20rem);
  margin: 0 auto calc(min(78%, 20rem) * -0.1);
`

export function HomeSection() {
  return (
    <Section aria-labelledby="home-title">
      <Column>
        <Layout>
          <Reveal>
            <Eyebrow>Home</Eyebrow>
            <H2 id="home-title">As many goals as the year needs</H2>
            <Lead>
              Each goal is a colour block on Home in the order you choose, and Set a goal comes
              after the last one. One goal is free, and Goals Plus holds any number of them.
            </Lead>
          </Reveal>
          <Reveal delay={120}>
            <Ground>
              <Phone>
                <Mockup
                  name="home-add"
                  sizes="(min-width: 980px) 320px, 78vw"
                  alt="Home on an iPhone: Run a marathon, Read 12 books, Learn Spanish and Save $10,000, each a block in its colour with its progress, and the Set a goal block after them."
                />
              </Phone>
            </Ground>
          </Reveal>
        </Layout>
      </Column>
    </Section>
  )
}
