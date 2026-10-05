/**
 * The facts this site states, in one place.
 *
 * Everything here is checked against the app itself rather than remembered: the
 * prices are the App Store Connect products, and what each plan includes is
 * what the app's own paywall says. If one of them moves in the app, it moves
 * here, or the page starts describing a different product.
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
export const POLICY_UPDATED = '5 October 2026'

export type Plan = {
  name: string
  price: string
  period: string
  note: string
  /** The one the app itself recommends, and the one this page marks. */
  featured?: boolean
  badge?: string
}

/**
 * One goal is free, with no time limit; Goals Plus holds any number, and is the
 * same app otherwise. It comes three ways, and the page shows all three because
 * the app's paywall does.
 *
 * The saving on the yearly plan is the real arithmetic: $2.99 twelve times is
 * $35.88, and $19.99 is 44% less than that. It is the same number the app's own
 * paywall computes from StoreKit rather than a rounder one chosen for the page.
 */
export const FREE_PLAN: Plan = {
  name: 'Free',
  price: '$0',
  period: 'forever',
  note: 'One goal and everything else in the app, with no time limit.',
}

/** What the free plan includes. Goals Plus adds one thing to it: no limit. */
export const FREE_INCLUDES = [
  'One goal',
  'Milestones, tasks and habits',
  'The watch app, widgets and templates',
  'Sync, history, export and archiving',
] as const

export const PLUS_PLANS: readonly Plan[] = [
  {
    name: 'Monthly',
    price: '$2.99',
    period: 'a month',
    note: 'No limit on goals, billed monthly.',
  },
  {
    name: 'Yearly',
    price: '$19.99',
    period: 'a year',
    note: 'Billed once a year, which is 44% less than twelve months of Monthly.',
    featured: true,
    badge: 'Save 44%',
  },
  {
    name: 'Lifetime',
    price: '$49.99',
    period: 'once',
    note: 'A single payment, with nothing to renew.',
  },
]

export const PLANS: readonly Plan[] = [FREE_PLAN, ...PLUS_PLANS]

/** What each platform needs, in the one sentence the page states it in. */
export const REQUIREMENTS =
  'iPhone and iPad with iOS 26 or later, Mac with macOS 26 or later, Apple Watch with watchOS 26.'
