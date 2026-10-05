import styled, { css } from 'styled-components'

/**
 * The page's shared furniture: the column, the headings, the card.
 *
 * No gradients and no shadows on anything that is not hardware, for the same
 * reason there are none in the app (DESIGN.md §14): depth comes from a lifted
 * surface and a hairline. The one exception is a device, which casts a shadow
 * because it is an object sitting on the page (`deviceShadow`, in the theme).
 *
 * Mobile first. Every query is a `min-width` on one of the theme's three
 * breakpoints, so a phone gets the plain layout and the larger screens add to
 * it, rather than the other way round.
 */

export const Column = styled.div`
  width: 100%;
  max-width: calc(${({ theme }) => theme.maxWidth} + 2 * ${({ theme }) => theme.space.gutter});
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.gutter};
`

/** One idea per section, and room around it. The gap scales with the window
 *  (`space.section`, 80px on a phone to 160px on a wide screen). */
export const Section = styled.section`
  padding: ${({ theme }) => theme.space.section} 0;
`

/**
 * The type, in SF Pro and nothing else, as the app is (DESIGN.md §3).
 *
 * Display sizes are set at 600 rather than bold, tracked in as the size grows,
 * and balanced so a two line heading breaks where the sense does.
 */
const display = css`
  margin: 0;
  font-weight: 600;
  text-wrap: balance;
`

export const H1 = styled.h1`
  ${display}
  font-size: ${({ theme }) => theme.type.display};
  line-height: 1.02;
  letter-spacing: -0.035em;
`

export const H2 = styled.h2`
  ${display}
  font-size: ${({ theme }) => theme.type.title};
  line-height: 1.04;
  letter-spacing: -0.03em;
`

export const H3 = styled.h3`
  ${display}
  font-size: ${({ theme }) => theme.type.card};
  line-height: 1.15;
  letter-spacing: -0.02em;
`

/**
 * The name of the part of the product a section is about, above its heading.
 *
 * Sentence case, in the accent, at body size, which is where the app settled
 * its own section headers (DESIGN.md §3). Only where a section is about one
 * named thing, so it names something rather than decorating everything.
 */
export const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.s4};
  font-size: ${({ theme }) => theme.type.body};
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.color.accent};
`

/** The sentence under a heading. One or two, never a paragraph of selling. */
export const Lead = styled.p`
  margin: ${({ theme }) => theme.space.s6} 0 0;
  max-width: ${({ theme }) => theme.measure};
  font-size: ${({ theme }) => theme.type.lead};
  line-height: 1.45;
  letter-spacing: -0.012em;
  color: ${({ theme }) => theme.color.textSecondary};
  text-wrap: pretty;

  a {
    color: ${({ theme }) => theme.color.accent};
    text-underline-offset: 3px;
  }
`

/** Body copy inside a card or a list. */
export const Body = styled.p`
  margin: ${({ theme }) => theme.space.s3} 0 0;
  max-width: ${({ theme }) => theme.measure};
  font-size: ${({ theme }) => theme.type.body};
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textSecondary};
  text-wrap: pretty;
`

/** The small print: platforms, requirements, what the price covers. */
export const Fine = styled.p`
  margin: ${({ theme }) => theme.space.s4} 0 0;
  font-size: ${({ theme }) => theme.type.small};
  line-height: 1.5;
  color: ${({ theme }) => theme.color.textSecondary};
  text-wrap: pretty;
`

/** A section's heading block, left aligned over the grid below it, which is
 *  where the eye goes next. */
export const Intro = styled.header`
  margin-bottom: ${({ theme }) => theme.space.s12};

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    margin-bottom: ${({ theme }) => theme.space.s16};
  }
`

/**
 * A feature card: the app's lifted surface at a page's scale.
 *
 * It clips, so a device can run off its bottom edge, which says "there is more
 * of this screen" without showing all of it, and keeps every card in a row the
 * same height whatever is inside.
 */
export const Card = styled.article`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.color.surface};
  padding: ${({ theme }) => theme.space.s8} ${({ theme }) => theme.space.s8} 0;

  @media (min-width: ${({ theme }) => theme.bp.lg}) {
    padding: ${({ theme }) => theme.space.s10} ${({ theme }) => theme.space.s10} 0;
  }
`
