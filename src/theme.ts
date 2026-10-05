/**
 * The app's design tokens, ported exactly, in both schemes.
 *
 * Goals has a light mode and a dark one and they are not symmetric: each accent
 * is a *pair*, a bright cut for the black canvas and a deepened cut of the same
 * hue for the white one, chosen so the accent passes WCAG AA as text on its own
 * canvas in both. Taking one value and using it on both grounds is the mistake
 * that pairing exists to prevent, so this file carries the pairs and nothing
 * reads a raw hex anywhere else.
 *
 * Source: `GoalsKit/Sources/GoalsKit/Design/DesignTokens.swift`.
 */

export type Mode = 'light' | 'dark'

const palette = {
  light: {
    /** `DS.canvas` */
    canvas: '#FFFFFF',
    /** `DS.surface` — panels and cards. */
    surface: '#F2F2F2',
    /** `DS.surfaceAlt` — a recess inside a surface. */
    surfaceAlt: '#E5E5E7',
    /** One step deeper than the canvas, for a band that has to separate itself. */
    canvasAlt: '#FAFAFA',
    textPrimary: '#0A0A0A',
    textSecondary: '#6B6B70',
    /** `DS.border` */
    border: 'rgba(0, 0, 0, 0.08)',
    /** A rule that has to be visible against a surface rather than the canvas. */
    borderStrong: 'rgba(0, 0, 0, 0.14)',
    /** `DS.Accent.blue`, light cut. Also the icon fill. */
    accent: '#2563EB',
    /** `Accent.ink` on that fill. */
    ink: '#FFFFFF',
    /** The ground a family of devices stands on. One step off the canvas. */
    stage: '#F5F5F7',
    /** The glass around every screen. Black in both schemes, because it is. */
    glass: '#050505',
    /** The metal band around the glass, the one line that says "hardware". */
    rim: '#C7C7CC',
    /**
     * Under a device, and only a device. Hardware casts a shadow, a panel does
     * not (DESIGN.md §14), and without one a framed phone on a white page reads
     * as a sticker. Two soft layers: the contact shadow and the long one.
     */
    deviceShadow:
      'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08)) drop-shadow(0 28px 48px rgba(0, 0, 0, 0.14))',
    /** The header once the page has scrolled under it. */
    barGlass: 'rgba(255, 255, 255, 0.78)',
    /** The privacy band: the opposite ground, so the middle of the page turns. */
    inverse: '#0A0A0A',
    inverseText: '#FFFFFF',
    inverseSecondary: '#A1A1A6',
    /** The accent that reads on the inverse ground, which is dark in both. */
    inverseAccent: '#60A5FA',
    /** A hairline on the inverse ground. */
    inverseBorder: 'rgba(255, 255, 255, 0.16)',
    /** The app's orange (`clay`), deepened for the white canvas, and the type
     *  on it. Run a marathon's colour, for the one goal the page draws. */
    goal: '#C2410C',
    onGoal: '#FFFFFF',
  },
  dark: {
    canvas: '#000000',
    surface: '#1C1C1E',
    surfaceAlt: '#2C2C2E',
    canvasAlt: '#0A0A0A',
    textPrimary: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: 'rgba(255, 255, 255, 0.12)',
    borderStrong: 'rgba(255, 255, 255, 0.2)',
    /** `DS.Accent.blue`, dark cut. The one that has to read on black. */
    accent: '#60A5FA',
    ink: '#0A0A0A',
    stage: '#0C0C0D',
    glass: '#050505',
    rim: '#48484A',
    /** Black on black shows nothing, so the long shadow goes and a faint lift
     *  of the ground under the device does its job. */
    deviceShadow: 'drop-shadow(0 24px 60px rgba(0, 0, 0, 0.9))',
    barGlass: 'rgba(0, 0, 0, 0.72)',
    inverse: '#1C1C1E',
    inverseText: '#FFFFFF',
    inverseSecondary: '#8E8E93',
    inverseAccent: '#60A5FA',
    inverseBorder: 'rgba(255, 255, 255, 0.14)',
    /** The bright cut, under black type, as the app draws it on black. */
    goal: '#F5941C',
    onGoal: '#0A0A0A',
  },
} as const

const shape = {
  radius: {
    sm: '10px',
    md: '20px',
    lg: '28px',
    /** The feature cards: a step past the app's own panel, because a card on
     *  a page this wide is several times the size of one on a phone. */
    xl: '36px',
    pill: '999px',
  },
  space: {
    s1: '4px',
    s2: '8px',
    s3: '12px',
    s4: '16px',
    s5: '20px',
    s6: '24px',
    s8: '32px',
    s10: '40px',
    s12: '48px',
    s16: '64px',
    s20: '80px',
    s24: '96px',
    s32: '128px',
    /**
     * The two measures that scale with the window rather than stepping at a
     * breakpoint: the space between sections (80px on a phone to 160px on a
     * wide screen) and the gutter (20px to 40px). Everything else is a fixed
     * step on the scale above.
     */
    section: 'clamp(5rem, 3.4rem + 6.8vw, 10rem)',
    gutter: 'clamp(1.25rem, 0.8rem + 1.8vw, 2.5rem)',
  },
  /**
   * The type scale, fluid between a phone and a wide screen.
   *
   * SF Pro at display sizes wants to be set tight and not too heavy: 600, with
   * tracking that closes up as the size grows. Each step is one clamp, so a
   * heading is never the size of the breakpoint it last crossed.
   */
  type: {
    display: 'clamp(2.75rem, 1.5rem + 5.4vw, 5.75rem)',
    title: 'clamp(2.125rem, 1.3rem + 3.2vw, 4rem)',
    card: 'clamp(1.375rem, 1.15rem + 0.7vw, 1.75rem)',
    lead: 'clamp(1.125rem, 1rem + 0.55vw, 1.4375rem)',
    body: '1.0625rem',
    small: '0.9375rem',
    fine: '0.8125rem',
  },
  /**
   * Three breakpoints, and only three.
   *
   * There were five before, at 560, 720, 800, 900 and 980, each chosen for the
   * one component it was written in. That is how a page ends up rearranging
   * itself four separate times between a tablet and a phone, with a different
   * gutter after each one. Every query in the site now names one of these.
   */
  bp: {
    /** A phone. Below this, one column of anything. */
    sm: '560px',
    /** A small tablet, or a phone on its side. */
    md: '760px',
    /** Where two columns of substance stop fitting side by side. */
    lg: '980px',
  },
  /** The page's widest content. Text inside it keeps to `measure`. */
  maxWidth: '1200px',
  /** A comfortable line of body text. */
  measure: '36rem',
} as const

export function buildTheme(mode: Mode) {
  return { mode, color: palette[mode], ...shape }
}

export type Theme = ReturnType<typeof buildTheme>

/** Prefixed, because every app in the portfolio shares one origin and one
 *  `localStorage` namespace. An unprefixed `theme` key would be a collision. */
export const THEME_KEY = 'goals.theme'
