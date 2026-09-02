import styled, { css } from 'styled-components'

/**
 * The page's shared furniture: the column, the headings, the rules, the panel.
 *
 * There are no cards with borders here and no shadows anywhere, for the same
 * reason there are none in the app (DESIGN.md §14): depth comes from a lifted
 * surface, and a shadow reads as a different design system. A panel is
 * `surface` on `canvas` and nothing else.
 */

export const Column = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.s6};
`

export const Section = styled.section`
  padding: ${({ theme }) => theme.space.s24} 0;

  @media (max-width: 720px) {
    padding: ${({ theme }) => theme.space.s16} 0;
  }
`

/** The hairline between one section and the next. */
export const Rule = styled.hr`
  height: 1px;
  border: 0;
  margin: 0;
  background: ${({ theme }) => theme.color.border};
`

export const H1 = styled.h1`
  margin: 0;
  font-size: clamp(2.75rem, 7vw, 4.25rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  font-weight: 700;
`

export const H2 = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space.s5};
  font-size: clamp(1.75rem, 3.6vw, 2.5rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
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
 * card. Tracked out, secondary ink, and never larger than the body.
 */
export const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.space.s4};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textSecondary};
`

export const Prose = styled.p<{ $lead?: boolean }>`
  margin: 0 0 ${({ theme }) => theme.space.s5};
  max-width: 62ch;
  color: ${({ theme }) => theme.color.textSecondary};

  ${({ $lead }) =>
    $lead &&
    css`
      font-size: 1.25rem;
      line-height: 1.5;
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

  @media (max-width: 720px) {
    padding: ${({ theme }) => theme.space.s6};
  }
`

/**
 * A screenshot of the running app.
 *
 * The app is black to its edges, so a screenshot dropped on this page would
 * bleed into it and the goal blocks would look like they were floating in the
 * layout. The hairline is what says where the phone stops. No bezel is drawn:
 * a fake device frame is a graphic about an app, which is the thing the
 * portfolio's own rules say a picture of an app must not be.
 */
export const Shot = styled.img`
  width: 100%;
  /* The width and height attributes are on the element so the layout does not
     jump while the image loads. Without this line those same attributes pin the
     rendered height at the pixel height of the file. */
  height: auto;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
`
