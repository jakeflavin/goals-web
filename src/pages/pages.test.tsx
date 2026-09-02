import { screen } from '@testing-library/react'
import { renderPage } from '../test/render'
import { Landing } from './Landing'
import { Privacy } from './Privacy'
import { Support } from './Support'
import { APP_STORE_URL, CONTACT_EMAIL, IS_ON_THE_APP_STORE } from '../lib/site'

describe('the landing page', () => {
  it('leads with the product opinion', () => {
    renderPage(<Landing />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Five goals. One year.')
  })

  it('shows all three prices', () => {
    renderPage(<Landing />)
    for (const price of ['$2.99', '$19.99', '$49.99']) {
      expect(screen.getByText(price)).toBeInTheDocument()
    }
  })

  it('does not link at the App Store until the app is on it', () => {
    renderPage(<Landing />)
    const link = screen.queryByRole('link', { name: /App Store/i })

    // A landing page that sends somebody to a 404 has failed at the one thing it
    // is for, so the link only exists once the store page does.
    if (IS_ON_THE_APP_STORE) {
      expect(link).toHaveAttribute('href', APP_STORE_URL)
    } else {
      expect(link).toBeNull()
      expect(screen.getByText('Coming to the App Store')).toBeInTheDocument()
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
    renderPage(<Support />)
    expect(screen.getAllByRole('link', { name: CONTACT_EMAIL })[0]).toHaveAttribute(
      'href',
      `mailto:${CONTACT_EMAIL}`,
    )
  })
})
