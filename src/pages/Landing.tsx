import { Agents } from './landing/Agents'
import { Closing } from './landing/Closing'
import { Devices } from './landing/Devices'
import { Hero } from './landing/Hero'
import { HomeSection } from './landing/HomeSection'
import { Inside } from './landing/Inside'
import { Maker } from './landing/Maker'
import { Price } from './landing/Price'
import { PrivacyBand } from './landing/PrivacyBand'

/**
 * The landing page.
 *
 * Built to be read top to bottom by somebody who has never heard of the app,
 * one idea per section, each said in a sentence or two and shown rather than
 * listed: what it is, Home and its one rule, what a goal is made of, every
 * screen it runs on, the AI agents on the Mac, privacy, the price, and who made
 * it. Longer answers live on the support page, which is where people arrive
 * with questions.
 *
 * Every device is the app running with its `-seed` launch argument, captured in
 * both schemes and drawn into its frame by bezl (`scripts/make-mockups.mjs`).
 * The one picture drawn in code is the lock in card's progress bar, from the
 * same seeded values.
 */
export function Landing() {
  return (
    <>
      <Hero />
      <HomeSection />
      <Inside />
      <Devices />
      <Agents />
      <PrivacyBand />
      <Price />
      <Maker />
      <Closing />
    </>
  )
}
