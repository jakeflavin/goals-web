import { Document } from '../components/Document'
import { CONTACT_EMAIL, POLICY_UPDATED } from '../lib/site'

/**
 * The privacy policy, and the URL that goes in App Store Connect.
 *
 * Every claim on this page is one the app can be held to. It collects nothing,
 * so the policy says it collects nothing, and then spends the rest of its length
 * naming the places somebody would reasonably expect data to go and saying what
 * actually happens there instead. A policy that only said "we respect your
 * privacy" would be shorter and worth nothing.
 */
export function Privacy() {
  return (
    <Document
      title="Privacy policy"
      standfirst="Goals collects nothing. There is no account, no sign up, no analytics, no advertising and no tracking."
      updated={POLICY_UPDATED}
    >
      <h2>The short version</h2>
      <p>
        Goals is a goal tracker that runs entirely on your device. It has no server, no
        backend and no account system. Nothing you write in it is sent to me or to anybody
        else. The App Store privacy label for Goals says <strong>Data Not Collected</strong>,
        and that is accurate: there is no category of data the app gathers, because there is
        nowhere for it to go.
      </p>

      <h2>What the app stores, and where</h2>
      <p>
        Your goals, milestones, tasks, habits, habit history and settings are stored on your
        device, in the app&rsquo;s own storage. Some of it sits in a shared container so that
        the widgets and the Apple Watch app can read it. That container is on the same device
        and is not readable by other apps.
      </p>
      <p>
        There is no sync between devices. Goals on your iPhone and Goals on somebody
        else&rsquo;s iPhone have no way of knowing about each other.
      </p>

      <h2>Backups</h2>
      <p>
        If you back up your iPhone, the app&rsquo;s data goes into that backup along with
        everything else on the phone. That backup belongs to you and is held under your Apple
        Account, governed by Apple&rsquo;s terms and privacy policy. I have no access to it
        and no way to ask for it.
      </p>

      <h2>The subscription</h2>
      <p>
        Goals offers a subscription and a one time purchase that unlock all five goal slots.
        Every part of buying one is handled by Apple through the App Store. I never see your
        name, your email address, your card, your billing address or your purchase history.
      </p>
      <p>
        What the app receives from Apple is an answer to one question: whether this device
        currently has an active entitlement. It uses that answer to decide how many goals may
        be locked in at once, and it stores that answer on the device. Apple&rsquo;s handling
        of the payment is covered by{' '}
        <a href="https://www.apple.com/legal/privacy/" rel="noreferrer">
          Apple&rsquo;s privacy policy
        </a>
        .
      </p>
      <p>
        You can manage or cancel a subscription in the Settings app on your iPhone, under your
        name, in Subscriptions. Cancelling never deletes anything you have written.
      </p>

      <h2>Notifications, Siri and Spotlight</h2>
      <p>
        Reminders for habits are local notifications, scheduled by the app on your device. No
        notification is sent through a server.
      </p>
      <p>
        Goals provides actions to Siri and Shortcuts, and indexes your goals and habits so
        Spotlight can find them. Both of those are Apple system features running on your
        device. Anything Siri does with your voice is between you and Apple and is covered by
        Apple&rsquo;s privacy policy, not by this one.
      </p>

      <h2>Export and import</h2>
      <p>
        You can export everything as a Markdown file, and import goals from a JSON file. Both
        are things you start yourself. An export goes wherever you send it with the iOS share
        sheet, and once it leaves the app it is out of the app&rsquo;s hands. Nothing is
        exported automatically.
      </p>

      <h2>Deleting your data</h2>
      <p>
        Settings has a Delete all goals action that removes everything the app has stored.
        Deleting the app from your phone removes it too. Because none of it was ever anywhere
        else, that is the whole deletion: there is no copy of it to request and nothing for me
        to erase on your behalf.
      </p>

      <h2>Third parties</h2>
      <p>
        Goals uses no analytics, no crash reporting service, no advertising network and no
        third party SDKs of any kind. It makes no network requests of its own. The only
        company involved in the app at all is Apple, as the store that sells it and the
        platform it runs on.
      </p>
      <p>
        If you have turned on Share With App Developers in your iPhone&rsquo;s Privacy and
        Security settings, Apple may pass me aggregated crash and usage reports. Those come
        from Apple, are not tied to a person, and are not something the app produces or can
        see.
      </p>

      <h2>Children</h2>
      <p>
        Goals is rated 4+ and collects nothing from anybody, at any age. There is no data to
        handle differently for a child, because there is no data.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If the app ever starts doing something this page does not describe, this page changes
        first, and the date at the top changes with it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about any of this go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        , and I will answer.
      </p>
    </Document>
  )
}
