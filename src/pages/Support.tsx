import { Document } from '../components/Document'
import { CONTACT_EMAIL } from '../lib/site'

/**
 * The support page, and the URL that goes in App Store Connect.
 *
 * One person, one email address, and answers to the questions somebody actually
 * arrives with. The questions below are the ones the app's own behaviour raises:
 * what the subscription gates, what happens when it ends, and where the data
 * goes. A support page that only listed an address would send every one of them
 * to the inbox.
 */
export function Support() {
  return (
    <Document
      title="Support"
      standfirst="Goals is made by one person, and email is the whole support system. Write to me and I will answer."
    >
      <h2>Getting in touch</h2>
      <p>
        Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. If something is broken,
        it helps to say which device you are on, which version of iOS or macOS, and what you
        did just before it happened. I read everything, and I answer as fast as one person can.
      </p>
      <p>
        Bug reports and feature requests go to the same address. There is no forum and no
        ticket system to sign up for.
      </p>

      <h2>How do I unlock all five goals?</h2>
      <p>
        The first goal slot is free with no time limit. Unlocking the other four is a
        subscription, monthly or yearly, or a one time purchase. You can buy it from the
        screen that appears when you try to lock in a second goal, or from the subscription
        card in Settings.
      </p>

      <h2>I already paid and the app does not know</h2>
      <p>
        Open the subscription screen and tap Restore under the purchase button, in the row
        with Terms and Privacy. Make sure you are signed in to the same Apple Account you bought it with. If
        it still does not come back, email me.
      </p>

      <h2>How do I cancel?</h2>
      <p>
        In the Settings app on your iPhone or iPad, tap your name, then Subscriptions, then
        Goals. On a Mac, open the App Store, click your name, then Account Settings, then
        Subscriptions. Cancelling stops the renewal and you keep the subscription until the period you
        already paid for runs out.
      </p>

      <h2>What happens to my goals if I stop subscribing?</h2>
      <p>
        Nothing is deleted, ever. The app is deliberately slow to act here: it waits for
        Apple&rsquo;s billing retry to finish, and it wants the same answer twice across
        several days before it decides a subscription has really ended. Goals you had already
        locked in are protected. If a slot is released it goes back to being a draft, the app
        tells you it happened, and everything you wrote in it is still there.
      </p>

      <h2>Does it sync between my devices?</h2>
      <p>
        Yes, through your own iCloud. Goals, habits and history stay the same on every iPhone,
        iPad and Mac signed in to the same Apple Account, with no Goals account to make. Sync is
        on by default and can be turned off in Settings; the change takes effect the next time
        the app opens. The Apple Watch app reads from the iPhone it is paired with.
      </p>
      <p>
        If a device is not catching up, check that it is signed in to iCloud and that Settings
        in Goals shows sync as up to date.
      </p>

      <h2>Can I get my goals out?</h2>
      <p>
        Settings has Export everything as Markdown, which produces a single readable file with
        every goal, milestone, task and habit in it. There is also an import that takes a JSON
        file, so a plan written somewhere else can be brought in whole.
      </p>

      <h2>How do I delete everything?</h2>
      <p>
        Settings has Delete all goals. It asks first, and it cannot be undone. With sync on it
        removes everything from your iCloud and from every device signed in to it. Deleting the
        app from one device does not touch the copy in your iCloud, which is what lets a
        reinstall bring your goals back.
      </p>

      <h2>How do I connect an AI agent on the Mac?</h2>
      <p>
        In Goals on the Mac, open Settings, then AI agents. Turn on Allow AI agents, and Allow
        changes as well if you want the agent to write. The same page has step by step setup
        for Claude Desktop, Claude Code, Cursor, VS Code and others, with the text to copy.
        Locking in, unlocking, resetting and deleting always ask you first in Goals.
      </p>

      <h2>Why only five goals?</h2>
      <p>
        Because a list you can add to forever stops meaning anything. Five is enough room for a
        year and not enough room to avoid choosing, and choosing is the part that makes the
        rest work. It is the one opinion the app has.
      </p>

      <h2>Why did a habit not break my streak?</h2>
      <p>
        A streak counts back from the last day you logged, not from today. A day you have not
        got to yet is not a day you failed. A missed day is only written once the day is over,
        and a habit that was paused is never recorded as missed.
      </p>

      <h2>What does it need?</h2>
      <p>
        An iPhone or iPad running iOS 26 or iPadOS 26 or later, or a Mac running macOS 26 or
        later. The watch app needs watchOS 26 or later on a paired Apple Watch.
      </p>
    </Document>
  )
}
