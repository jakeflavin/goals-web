import { screen, within } from '@testing-library/react'
import { renderPage } from '../test/render'
import { Landing } from './Landing'
import { Privacy } from './Privacy'
import { Support } from './Support'
import { APP_STORE_URL, CONTACT_EMAIL, IS_ON_THE_APP_STORE, PLANS } from '../lib/site'

describe('the landing page', () => {
  it('leads with the product opinion', () => {
    renderPage(<Landing />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Five goals. One year.')
  })

  it('gives every plan a price and a tier of its own', () => {
    renderPage(<Landing />)
    for (const plan of PLANS) {
      expect(screen.getByText(plan.price)).toBeInTheDocument()
    }
    // Free has to be one of them, or the page is selling something it gives away.
    expect(screen.getByText('$0')).toBeInTheDocument()
  })

  it('marks exactly one plan as the recommended one', () => {
    renderPage(<Landing />)
    expect(PLANS.filter((plan) => plan.featured)).toHaveLength(1)
    expect(screen.getByText('Save 44%')).toBeInTheDocument()
  })

  it('repeats the call to action at the bottom', () => {
    const { container } = renderPage(<Landing />)
    const label = IS_ON_THE_APP_STORE ? /Download on the App Store/i : /Coming to the App Store/i
    // Once under the headline and once at the end. A reader convinced by the
    // last section should not have to scroll back up to act on it.
    const calls = [...container.querySelectorAll('a, p')].filter((node) =>
      label.test(node.textContent ?? ''),
    )
    expect(calls.length).toBeGreaterThanOrEqual(2)
  })

  it('does not link at the App Store until the app is on it', () => {
    renderPage(<Landing />)
    const links = screen.queryAllByRole('link', { name: /App Store/i })

    if (IS_ON_THE_APP_STORE) {
      expect(links[0]).toHaveAttribute('href', APP_STORE_URL)
    } else {
      expect(links).toHaveLength(0)
    }
  })

  it('gives each of the three parts of a goal a section of its own', () => {
    renderPage(<Landing />)
    for (const eyebrow of ['Milestones', 'Tasks', 'Habits']) {
      expect(screen.getByText(eyebrow, { selector: 'p' })).toBeInTheDocument()
    }
  })

  it('sends the reader to the policy rather than summarising it', () => {
    renderPage(<Landing />)
    expect(screen.getByRole('link', { name: /Read the privacy policy/i })).toHaveAttribute(
      'href',
      '/goals/privacy/',
    )
  })
})

describe('the screenshots', () => {
  // The app's two schemes are not inversions of each other, so each one is
  // captured separately and the page picks the file rather than filtering the
  // image. A phone in the wrong scheme shows a product that does not exist.
  it.each(['light', 'dark'] as const)('are the %s capture in %s mode', (mode) => {
    const { container } = renderPage(<Landing />, mode)
    const phones = [...container.querySelectorAll('img')].filter((img) =>
      /home|detail|habits|tasks|habitdetail|widgets/.test(img.getAttribute('src') ?? ''),
    )

    expect(phones.length).toBeGreaterThan(0)
    for (const phone of phones) {
      expect(phone.getAttribute('src')).toContain(`-${mode}.`)
    }
  })

  it('describes every one of them', () => {
    const { container } = renderPage(<Landing />)
    for (const img of container.querySelectorAll('img')) {
      expect(img.getAttribute('alt')).toBeTruthy()
    }
  })
})

describe('the privacy policy', () => {
  it('says the thing the App Store label says', () => {
    renderPage(<Privacy />)
    expect(screen.getByText('Data Not Collected')).toBeInTheDocument()
  })

  it('gives a reachable address', () => {
    renderPage(<Privacy />)
    expect(screen.getAllByRole('link', { name: CONTACT_EMAIL })[0]).toHaveAttribute(
      'href',
      `mailto:${CONTACT_EMAIL}`,
    )
  })
})

describe('the support page', () => {
  it('answers restoring a purchase, which is the question that costs money', () => {
    renderPage(<Support />)
    expect(screen.getByText(/Restore\s+purchases/)).toBeInTheDocument()
  })

  it('gives a reachable address', () => {
    const { container } = renderPage(<Support />)
    expect(within(container).getAllByRole('link', { name: CONTACT_EMAIL })[0]).toHaveAttribute(
      'href',
      `mailto:${CONTACT_EMAIL}`,
    )
  })
})
