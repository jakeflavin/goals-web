import styled, { css } from 'styled-components'

/**
 * The page's shared furniture: the column, the headings, the rules, the panel.
 *
 * No shadows and no gradients, for the same reason there are none in the app
 * (DESIGN.md §14): depth comes from a lifted surface, and a shadow reads as a
 * different design system. The device frames draw their own edges because
 * they are hardware rather than panels, and even they do it with a line.
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
 * which gave an 834px tablet exactly the same rhythm as a 390px phone. The top
 * step is 128 rather than 96: at 96 a wide screen showed the end of one section
 * and the start of the next in the same glance, and a page that never lets one
 * idea have the screen to itself reads as a brochure.
 *
 * The rest of the spacing follows three rules, and every grid on the page uses
 * one of them:
 *
 * - Columns of prose in one section: `s16` side by side, `s12` once stacked.
 * - Cards in a grid: `s4`.
 * - Items in a hairline list: `s6`.
 */
export const Section = styled.section`
  padding: ${({ theme }) => theme.space.s32} 0;

  @media (max-width: ${({ theme }) => theme.bp.lg}) {
    padding: ${({ theme }) => theme.space.s24} 0;
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

/**
 * The type scale, in SF Pro and nothing else, as the app is (DESIGN.md §3).
 *
 * The scale is steep on purpose. A page set at 44px headings over 17px body
 * reads as a document; the headline here runs to 7.5rem and the section
 * headings to 3.5rem, tracked in hard as SF Display wants at that size, so
 * the page has one voice for claims and another for explaining them.
 */
export const H1 = styled.h1`
  margin: 0;
  font-size: clamp(3.5rem, 8.6vw, 7.5rem);
  line-height: 0.94;
  letter-spacing: -0.05em;
  font-weight: 700;

  span {
    display: block;
  }
`

export const H2 = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space.s6};
  max-width: 20ch;
  font-size: clamp(2.25rem, 4.4vw, 3.5rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  font-weight: 700;
  text-wrap: balance;
`

export const H3 = styled.h3`
  margin: 0 0 ${({ theme }) => theme.space.s2};
  font-size: 1.0625rem;
  line-height: 1.35;
  font-weight: 600;
`

/**
 * The name of the thing a section is about, above its heading.
 *
 * Sentence case, in the accent, at body size, which is where the app settled
 * its own section headers (DESIGN.md §3: an 11pt tracked caption "reads as an
 * annotation stuck onto the card"). It used to be tracked capitals over every
 * section on the page; it is now only where a section is about one named part
 * of the product, so it names something rather than decorating everything.
 */
export const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.s3};
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.01em;
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
      font-size: clamp(1.125rem, 1.7vw, 1.375rem);
      line-height: 1.45;
      letter-spacing: -0.01em;
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
