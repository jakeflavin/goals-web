import { Document } from '../components/Document'
import { CONTACT_EMAIL } from '../lib/site'

/**
 * The support page, and the URL that goes in App Store Connect.
 *
 * One person, one email address, and answers to the questions somebody actually
 * arrives with. The questions below are the ones the app's own behaviour raises:
 * what the subscription changes, what happens when it ends, what archiving
 * does, and where the data goes. A support page that only listed an address would send every one of them
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

      <h2>How do I set more than one goal?</h2>
      <p>
        One goal is free, with no time limit. More than one takes Goals Plus, which is a
        monthly or yearly subscription or a one time Lifetime purchase. Its screen opens when
        you set a goal past the free one, and the subscription card in Settings opens it too.
        One purchase covers iPhone, iPad and Mac.
      </p>

      <h2>Is there a limit on how many goals I can have?</h2>
      <p>
        Only on the free plan, which holds one goal. Drafts and finished goals count toward it,
        and archived goals never do, on either plan. Goals Plus has no limit.
      </p>

      <h2>How much is Goals Plus?</h2>
      <p>
        Monthly is $2.99 and Yearly is $19.99, which is 44% less than twelve months of Monthly.
        Lifetime is $49.99, paid once. These are the US prices, and the App Store shows the
        price for your own country. Goals Plus changes only how many goals you can have: the
        watch app, widgets, templates, history, export, sync and archiving are the same on the
        free plan.
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
        several days before it decides a subscription has really ended. Then the goal locked
        in longest stays locked in, and the others go back to being drafts with everything in
        them kept. Their habits pause while they are drafts, so nothing is recorded as missed,
        and the app tells you it happened. Setting a new goal opens the Goals Plus screen until
        you are back within the free plan, and archived goals are left as they are.
      </p>

      <h2>What does Archive do?</h2>
      <p>
        Archive is in a goal&rsquo;s menu, and it asks first. The goal is kept whole, history
        included, to look back on, and until it comes back it is left out of Home, Tasks,
        Habits, the widgets, the watch, Siri, Spotlight, reminders and AI agents. It
        doesn&rsquo;t count toward the free plan, and its habits pause, so nothing is recorded
        as missed while it is archived. To bring it back, turn on Show archived goals in
        Settings &rsaquo; Home, open the goal and choose Unarchive; it returns at the end of
        Home.
      </p>

      <h2>Can I bring back an archived goal on the free plan?</h2>
      <p>
        Yes, when the plan has room for it. Bringing a goal back counts the same as setting a
        new one, so if the free plan&rsquo;s one goal is already in use, the Goals Plus screen
        opens instead.
      </p>

      <h2>Can I choose which goals Home shows?</h2>
      <p>
        Settings &rsaquo; Home has two switches, set on each device. Show completed goals is on
        to begin with; turn it off and finished goals leave Home, but they still count and keep
        their numbers, so the goals around them are not renumbered. Show archived goals is off
        to begin with; turn it on and archived goals appear after the others, to look back on.
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
        Settings has Export as Markdown, which makes a readable copy of your goals for a notes
        app, with archived goals after the rest. The history of each habit, day by day, stays
        in the app. Import goals from JSON takes a file or the clipboard, and imported goals
        arrive as drafts, as many as the plan has room for.
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
        for Claude Desktop, Claude Code, Cursor, VS Code, Codex CLI, Gemini CLI and other apps
        that support local MCP servers, with the text to copy. Locking in, unlocking, resetting
        and deleting always ask you first in Goals, and a question nobody answers within 45
        seconds changes nothing. An agent never sees an archived goal.
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
