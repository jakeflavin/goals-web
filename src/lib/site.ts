/**
 * The facts this site states, in one place.
 *
 * Everything here is checked against the app itself rather than remembered: the
 * prices are the App Store Connect products, and the goal block colours and
 * numbers are the five the seeded home screen actually draws. If one of them
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
export const POLICY_UPDATED = '24 September 2026'

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

/** What each platform needs, in the one sentence the page states it in. */
export const REQUIREMENTS =
  'iPhone and iPad with iOS 26 or later, Mac with macOS 26 or later, Apple Watch with watchOS 26.'

/**
 * The seeded home screen, slot by slot: the five goals the app's `-seed` launch
 * argument writes, with the progress and the metadata line each block reads out.
 *
 * The hero draws these rather than photographing them, so they are sharp at
 * any width and move with the page, but every value is the app's own: the
 * titles and numbers are `DebugSeed`, and the fills are sampled from the iPad
 * capture in each scheme. `dark` is the bright cut for the black canvas and
 * `light` the deepened cut for the white one, the same pairing as the accent.
 */
export type Slot = {
  title: string
  progress: number
  detail: string
  dark: string
  light: string
}

export const SLOTS: readonly Slot[] = [
  {
    title: 'Run a marathon',
    progress: 62,
    detail: '3/5 milestones · 2/3 tasks · 1/1 habits done',
    dark: '#F5941C',
    light: '#C2410C',
  },
  {
    title: 'Read 12 books',
    progress: 25,
    detail: '1/4 milestones · 1/1 habits done',
    dark: '#14B8A6',
    light: '#0F766E',
  },
  {
    title: 'Learn Spanish',
    progress: 33,
    detail: '1/3 milestones · 1/1 habits done',
    dark: '#A78BFA',
    light: '#6D28D9',
  },
  {
    title: 'Learn sourdough',
    progress: 0,
    detail: '0/1 tasks · 1 habit',
    dark: '#F5CC1B',
    light: '#9A6A0C',
  },
  {
    title: 'Save $10,000',
    progress: 77,
    detail: '2/3 milestones · 2/2 tasks',
    dark: '#34C759',
    light: '#15803D',
  },
]

/** The features that get a mention rather than a section of their own. */
export const SMALL_FEATURES = [
  { name: 'Siri and Shortcuts', detail: 'Start a goal, ask how one is going, or tick something off.' },
  { name: 'Handoff', detail: 'Open a goal on the phone and carry the same page to the Mac.' },
  { name: 'Spotlight', detail: 'Goals and habits are indexed, so search finds them.' },
  { name: 'Templates', detail: 'Seven categories of goal to start from, editable before you commit.' },
  { name: 'Reminders', detail: 'Local notifications for habits, on the schedule you set.' },
  { name: 'Keyboard', detail: 'On a Mac or an iPad with a keyboard, ⌘1 to ⌘5 open the five goals.' },
  { name: 'Export', detail: 'Everything you have written, as one Markdown file.' },
  { name: 'Import', detail: 'Bring a plan in from a JSON file, or from an AI chat.' },
] as const
