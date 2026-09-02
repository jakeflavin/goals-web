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
    /** The phone bezel. Reads as hardware in both schemes. */
    bezel: '#D8D8DC',
    bezelEdge: 'rgba(0, 0, 0, 0.16)',
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
    bezel: '#3A3A3C',
    bezelEdge: 'rgba(255, 255, 255, 0.22)',
  },
} as const

const shape = {
  radius: {
    sm: '10px',
    md: '20px',
    lg: '28px',
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
  /** The reading column. */
  maxWidth: '1120px',
} as const

export function buildTheme(mode: Mode) {
  return { mode, color: palette[mode], ...shape }
}

export type Theme = ReturnType<typeof buildTheme>

/** Prefixed, because every app in the portfolio shares one origin and one
 *  `localStorage` namespace. An unprefixed `theme` key would be a collision. */
export const THEME_KEY = 'goals.theme'
