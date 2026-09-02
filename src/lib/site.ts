/**
 * The facts this site states, in one place.
 *
 * Everything here is checked against the app itself rather than remembered: the
 * prices are the App Store Connect products, the accent hexes are `DS.Accent` in
 * `GoalsKit/Sources/GoalsKit/Design/DesignTokens.swift`, and the goal block
 * colours are the five the seeded home screen actually draws. If one of them
 * moves in the app, it moves here, or the page starts describing a different
 * product.
 */

export const APP_STORE_ID = '6807473895'

/**
 * Flip to `true` the day the app is approved and the store page is reachable.
 *
 * Until then the page says it is coming rather than linking at a URL that
 * answers 404, which is the one thing a landing page must never do to somebody
 * who came to download something.
 */
export const IS_ON_THE_APP_STORE = false

export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`

export const CONTACT_EMAIL = 'jakeflavin@gmail.com'

/** Last time the privacy policy changed. Shown on that page, and nowhere else. */
export const POLICY_UPDATED = '2 September 2026'

export const PLANS = [
  { name: 'Monthly', price: '$2.99', note: 'a month' },
  { name: 'Yearly', price: '$19.99', note: 'a year, and the one most people want' },
  { name: 'Lifetime', price: '$49.99', note: 'once, and never again' },
] as const

/**
 * The five accents the home screen fills with, in slot order. Used for the one
 * decorative element on the page: the five-bar rule under the headline.
 */
export const SLOT_COLOURS = ['#F5941C', '#14B8A6', '#A78BFA', '#F5CC1B', '#34C759'] as const
