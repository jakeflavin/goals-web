import styled from 'styled-components'
import { Cta } from '../../components/Cta'
import { Mark } from '../../components/Mark'
import { Reveal } from '../../components/Reveal'
import { Column, Fine, H2, Lead, Section } from '../../components/primitives'
import { REQUIREMENTS } from '../../lib/site'

/**
 * The end of the page: the app's icon, one line, and the call to action again,
 * because a reader convinced by the last section should not have to scroll
 * back up to act on it.
 */

const Wrap = styled(Section)`
  text-align: center;

  ${Lead} {
    margin-inline: auto;
  }

  svg {
    display: block;
    margin: 0 auto ${({ theme }) => theme.space.s8};
  }
`

const Actions = styled.div`
  margin-top: ${({ theme }) => theme.space.s8};
  display: flex;
  flex-direction: column;
  align-items: center;
`

export function Closing() {
  return (
    <Wrap aria-labelledby="closing-title">
      <Column>
        <Reveal>
          <Mark size={88} title="The Goals app icon" />
          <H2 id="closing-title">Set a goal for the year</H2>
          <Lead>The first one is free, with no trial to run out.</Lead>
          <Actions>
            <Cta />
            <Fine>{REQUIREMENTS}</Fine>
          </Actions>
        </Reveal>
      </Column>
    </Wrap>
  )
}
