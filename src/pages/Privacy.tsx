import { Document } from '../components/Document'
import { CONTACT_EMAIL, POLICY_UPDATED } from '../lib/site'

/**
 * The privacy policy, and the URL that goes in App Store Connect.
 *
 * Every claim on this page is one the app can be held to. It collects nothing,
 * so the policy says it collects nothing, and then spends the rest of its length
 * naming the places somebody would reasonably expect data to go and saying what
 * actually happens there instead. iCloud sync is the one place data does go,
 * so it gets the most words: whose storage it is, what goes there, and how to
 * turn it off. A policy that only said "we respect your
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
        Goals is a goal tracker for iPhone, iPad, Mac and Apple Watch. It has no server, no
        backend and no account system of its own. Nothing you write in it is sent to me or to
        anybody else. It can keep your devices in step through your own iCloud, which is
        storage Apple provides to you under your Apple Account, not to me. The App Store
        privacy label for Goals says <strong>Data Not Collected</strong>, and that is accurate:
        there is no category of data the app gathers, because there is nowhere of mine for it
        to go.
      </p>

      <h2>What the app stores, and where</h2>
      <p>
        Your goals, milestones, tasks, habits, habit history and settings are stored on each
        device, in the app&rsquo;s own storage. Some of it sits in a shared container so that
        the widgets and the Apple Watch app can read it. That container is on the same device
        and is not readable by other apps.
      </p>

      <h2>iCloud sync</h2>
      <p>
        Goals keeps your iPhone, iPad and Mac in step through the private iCloud database that
        belongs to your Apple Account. What goes there is your goals, milestones, tasks, habits
        and habit history. It is stored by Apple, encrypted in transit and at rest, and only
        devices signed in to your Apple Account can read it. I cannot see it, and nobody else
        can either. Apple&rsquo;s handling of iCloud is covered by{' '}
        <a href="https://www.apple.com/legal/privacy/" rel="noreferrer">
          Apple&rsquo;s privacy policy
        </a>
        .
      </p>
      <p>
        Sync is on by default, and Settings has a switch to turn it off. With it off, nothing
        leaves the device at all. Some things never sync either way: your subscription status,
        your reminder settings, and a Mac&rsquo;s menu bar and Dock settings stay on the device
        they were set on. The Apple Watch app does not use iCloud; it reads from the iPhone it
        is paired with.
      </p>

      <h2>Backups</h2>
      <p>
        If you back up your iPhone, iPad or Mac, the app&rsquo;s data goes into that backup
        along with everything else on the device. That backup belongs to you and is held under your Apple
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
        You can manage or cancel a subscription in the Settings app on your iPhone or iPad,
        under your name, in Subscriptions, or in the App Store on a Mac. Cancelling never
        deletes anything you have written.
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

      <h2>AI agents on the Mac</h2>
      <p>
        The Mac app can let an AI app on the same Mac, such as Claude, Cursor or VS Code, read
        and change your goals. It is off by default and stays off until you turn it on in
        Settings, and reading and changing are separate switches. The AI app reaches Goals through a helper inside Goals
        on the same Mac; Goals has no web address and accepts no connections from the network.
        Locking in, unlocking, resetting and deleting always wait for you to approve them in
        Goals.
      </p>
      <p>
        Most AI apps send what they read to their own servers to be processed, so once you
        connect one, your goals may reach the company that makes it. What that company does
        with them is covered by its privacy policy, not by this one. If you would rather none
        of your goals reach an AI service, leave the switch off.
      </p>

      <h2>Export and import</h2>
      <p>
        You can export everything as a Markdown file, and import goals from a JSON file. Both
        are things you start yourself. An export goes wherever you send it, and once it leaves
        the app it is out of the app&rsquo;s hands. Nothing is
        exported automatically.
      </p>
      <p>
        The Copy AI planning prompt button in Settings puts a prompt on your clipboard that
        includes the titles of your current goals. Goals sends nothing itself, but whatever you
        paste into an AI chat is shared with that service.
      </p>

      <h2>Deleting your data</h2>
      <p>
        Settings has a Delete all goals action that removes everything the app has stored.
        With sync on, that deletion reaches your iCloud and every device signed in to it.
        Deleting the app from one device removes that device&rsquo;s copy but leaves the one in
        your iCloud, which is what lets a reinstall find your goals again. None of it was ever
        anywhere of mine, so there is no copy to request from me and nothing for me to erase
        on your behalf.
      </p>

      <h2>Third parties</h2>
      <p>
        Goals uses no analytics, no crash reporting service, no advertising network and no
        tracking or advertising SDKs. The Mac app includes the open source Model Context
        Protocol Swift SDK and the three small libraries it is built on, all listed in the
        app&rsquo;s Acknowledgements, which let an AI app on the same Mac talk to Goals. They
        run only on your Mac, and Goals uses them only over a local connection that never
        leaves it. The only network
        connections Goals makes are to Apple: iCloud for sync, and the App Store for purchases.
        Apart from any AI app you choose to connect on a Mac, the only company involved in the
        app at all is Apple, as the store that sells it, the platform it runs on, and the iCloud
        that keeps your devices in step.
      </p>
      <p>
        If you have turned on Share With App Developers in your device&rsquo;s Privacy and
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
