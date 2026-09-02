import styled, { css } from 'styled-components'

/**
 * The page's shared furniture: the column, the headings, the rules, the panel.
 *
 * No shadows and no gradients, for the same reason there are none in the app
 * (DESIGN.md §14): depth comes from a lifted surface, and a shadow reads as a
 * different design system. The one exception is the phone bezel, which is
 * hardware rather than a panel.
 */

export const Column = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.s6};
`

/**
 * The vertical rhythm, and the numbers the whole page is spaced by.
 *
 * One step per breakpoint. It used to be two, 96 above `lg` and 64 below it,
 * which gave an 834px tablet exactly the same rhythm as a 390px phone.
 *
 * The rest of the spacing follows three rules, and every grid on the page uses
 * one of them:
 *
 * - Columns of prose in one section: `s16` side by side, `s12` once stacked.
 * - Cards in a grid: `s4`.
 * - Items in a hairline list: `s6`.
 */
export const Section = styled.section`
  padding: ${({ theme }) => theme.space.s24} 0;

  @media (max-width: ${({ theme }) => theme.bp.lg}) {
    padding: ${({ theme }) => theme.space.s20} 0;
  }

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    padding: ${({ theme }) => theme.space.s16} 0;
  }
`

/** A section that sits on the lifted ground rather than the canvas. Used to
 *  break the page into movements without drawing a rule across every one. */
export const Band = styled.div`
  background: ${({ theme }) => theme.color.canvasAlt};
  border-block: 1px solid ${({ theme }) => theme.color.border};
`

export const Rule = styled.hr`
  height: 1px;
  border: 0;
  margin: 0;
  background: ${({ theme }) => theme.color.border};
`

export const H1 = styled.h1`
  margin: 0;
  font-size: clamp(2.75rem, 6.4vw, 4.5rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 700;
`

export const H2 = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space.s5};
  font-size: clamp(1.875rem, 3.6vw, 2.75rem);
  line-height: 1.1;
  letter-spacing: -0.025em;
  font-weight: 700;
`

export const H3 = styled.h3`
  margin: 0 0 ${({ theme }) => theme.space.s2};
  font-size: 1.0625rem;
  line-height: 1.35;
  font-weight: 600;
`

/**
 * The uppercase caption above a section, the same device the app uses over a
 * card. Tracked out, in the accent, and never larger than the body.
 */
export const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.s4};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.accent};
`

export const Prose = styled.p<{ $lead?: boolean }>`
  margin: 0 0 ${({ theme }) => theme.space.s5};
  /* The measure. A ch is the width of a zero, so 62 of them is about 78 real
     characters, which is the top of the comfortable range. */
  max-width: 62ch;
  color: ${({ theme }) => theme.color.textSecondary};

  ${({ $lead }) =>
    $lead &&
    css`
      font-size: clamp(1.0625rem, 1.6vw, 1.3125rem);
      line-height: 1.5;
      /* Bigger type wants a shorter line, not the same one. At 62ch the hero
         paragraph ran to about ninety characters on a tablet. */
      max-width: 50ch;
    `}

  a {
    color: ${({ theme }) => theme.color.accent};
    text-underline-offset: 3px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

/** A lifted surface. The app's card, with the app's radius and no border. */
export const Panel = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.space.s8};

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    padding: ${({ theme }) => theme.space.s6};
  }
`

/**
 * Text on one side, a picture on the other, alternating down the page.
 *
 * The picture column is the narrower one. A phone is roughly twice as tall as
 * it is wide, so giving it half the width of a laptop makes the screenshot the
 * section and the words a caption, which is the wrong way round for a page
 * whose job is to explain something.
 */
export const Split = styled.div<{ $pictureFirst?: boolean }>`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: ${({ theme }) => theme.space.s16};
  align-items: center;

  > figure {
    margin: 0;
    order: ${({ $pictureFirst }) => ($pictureFirst ? -1 : 0)};
  }

  @media (max-width: ${({ theme }) => theme.bp.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space.s12};

    > figure {
      order: 0;
    }
  }
`

/** A list of named things under a heading, separated by hairlines. */
export const Items = styled.dl`
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.space.s6};

  /* 24 above the rule and 16 below it, so each rule reads as the top of the
     item beneath rather than as a divider floating between two. */
  div {
    padding-top: ${({ theme }) => theme.space.s4};
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.color.textSecondary};
    font-size: 0.9375rem;
  }
`

export const Grid = styled(Items)`
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr;
  }
`
