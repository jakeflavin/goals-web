/**
 * The app's design tokens, ported exactly.
 *
 * Goals is dark-first and its canvas is true black, so this site is dark and
 * only dark. That is a decision rather than an omission: the black canvas with
 * one blue accent *is* the app's face, and a light variant of this page would
 * show something nobody who downloads it will see first.
 */
export const theme = {
  color: {
    /** `DS.canvas`, dark. */
    canvas: '#000000',
    /** `DS.surface`, dark — panels and cards. */
    surface: '#1C1C1E',
    /** `DS.surfaceAlt`, dark — a recess inside a surface. */
    surfaceAlt: '#2C2C2E',
    text: '#FFFFFF',
    /** `DS.textSecondary`, dark. */
    textSecondary: '#8E8E93',
    /** `DS.border`, dark. */
    border: 'rgba(255, 255, 255, 0.12)',
    /** `DS.Accent.blue`, dark cut. The one that has to read on black. */
    accent: '#60A5FA',
    /** `DS.Accent.blue`, light cut. The icon fill, and nothing else. */
    accentDeep: '#2563EB',
    /** `Accent.ink` on a bright fill. */
    ink: '#0A0A0A',
  },
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
    s16: '64px',
    s24: '96px',
  },
  /** The reading column. Wider than prose wants, because the hero is two up. */
  maxWidth: '1040px',
} as const

export type Theme = typeof theme
