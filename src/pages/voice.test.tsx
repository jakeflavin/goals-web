import { renderPage } from '../test/render'
import { Landing } from './Landing'
import { Privacy } from './Privacy'
import { Support } from './Support'

/**
 * The house style, as a test.
 *
 * A dash is where a sentence should have ended, and a page full of them is the
 * single clearest tell that copy was not written by hand. This has been caught
 * by eye once already, on the App Store listing, which is exactly the kind of
 * thing that stops being caught by eye the fourth time somebody edits a page.
 */
const BANNED = [
  { name: 'em dash', pattern: /—/ },
  { name: 'en dash', pattern: /–/ },
]

const PAGES = [
  { name: 'landing', element: <Landing /> },
  { name: 'privacy', element: <Privacy /> },
  { name: 'support', element: <Support /> },
]

describe('the copy', () => {
  for (const page of PAGES) {
    for (const banned of BANNED) {
      it(`uses no ${banned.name} on the ${page.name} page`, () => {
        const { container } = renderPage(page.element)
        expect(container.textContent ?? '').not.toMatch(banned.pattern)
      })
    }
  }
})
