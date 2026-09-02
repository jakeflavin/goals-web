/**
 * The facts this site states, in one place.
 *
 * Everything here is checked against the app itself rather than remembered: the
 * prices are the App Store Connect products, the accent hexes are `DS.Accent`
 * in `GoalsKit/Sources/GoalsKit/Design/DesignTokens.swift`, and the goal block
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

export type Plan = {
  name: string
  price: string
  period: string
  note: string
  includes: readonly string[]
  /** The one the app itself recommends, and the one this page marks. */
  featured?: boolean
  badge?: string
}

/**
 * Four tiers, and the first one is free forever.
 *
 * The saving on the yearly plan is the real arithmetic: $2.99 twelve times is
 * $35.88, and $19.99 is 44% less than that. It is the same number the app's own
 * paywall computes from StoreKit rather than a rounder one chosen for the page.
 */
export const PLANS: readonly Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    note: 'One goal at a time, with no time limit and no trial to run out.',
    includes: [
      'One goal locked in at a time',
      'Milestones, tasks and habits',
      'Watch app, widgets and templates',
      'History and export',
    ],
  },
  {
    name: 'Monthly',
    price: '$2.99',
    period: 'a month',
    note: 'The whole app, and you can stop whenever you want.',
    includes: ['All five goal slots', 'Everything in the free plan'],
  },
  {
    name: 'Yearly',
    price: '$19.99',
    period: 'a year',
    note: 'A year of goals costs about what a month of most apps does.',
    includes: ['All five goal slots', 'Everything in the free plan'],
    featured: true,
    badge: 'Save 44%',
  },
  {
    name: 'Lifetime',
    price: '$49.99',
    period: 'once',
    note: 'Pay once. Nothing renews and nothing expires.',
    includes: ['All five goal slots', 'Everything in the free plan'],
  },
]

/**
 * The five accents the home screen fills with, in slot order.
 * `DS.Accent` dark cuts: orange, teal, violet, yellow, green.
 */
export const SLOT_COLOURS = ['#F5941C', '#14B8A6', '#A78BFA', '#F5CC1B', '#34C759'] as const

/** The features that get a mention rather than a section of their own. */
export const SMALL_FEATURES = [
  { name: 'Siri and Shortcuts', detail: 'Check off a habit, or ask what is due.' },
  { name: 'Spotlight', detail: 'Goals and habits are indexed, so search finds them.' },
  { name: 'Templates', detail: 'Seven categories of goal to start from, editable before you commit.' },
  { name: 'Reminders', detail: 'Local notifications for habits, on the schedule you set.' },
  { name: 'Export', detail: 'Everything you have written, as one Markdown file.' },
  { name: 'Import', detail: 'Bring a plan in from a JSON file, or from an AI chat.' },
] as const
