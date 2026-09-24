# Goals, the site

The landing page, privacy policy and support page for **Goals**, the goal
tracker for iPhone, iPad, Mac and Apple Watch. Served from a sub-path of the portfolio at
<https://portfolio-4b9fe.web.app/goals/>.

The two legal pages are not decoration. Their URLs are what App Store Connect
holds in the privacy policy and support fields, and `Legal.privacy` in the app
points at the privacy page from the subscription screen, so neither may move
without changing the app and the store record with it.

## The three pages

| Path | What it is |
|---|---|
| `/goals/` | The landing page |
| `/goals/privacy/` | The privacy policy |
| `/goals/support/` | Support, and the questions people arrive with |

Each is a real file in `dist`, built from its own `index.html` entry. That is
deliberate: the portfolio rewrites every unmatched path to the directory's own
page, and Hosting serves static files before it applies a rewrite, so a router
would put the directory page at `/goals/privacy/`. See `vite.config.ts`.

## Light and dark

The site follows the system by default, and a toggle in the header overrides it.
The choice is remembered under `goals.theme`, prefixed because every app in the
portfolio shares one origin and therefore one `localStorage` namespace.

Two things make this work rather than flicker:

- **An inline script in each page's `<head>`** writes `data-theme` on `<html>`
  before the first paint, and `src/index.css` paints the ground from that
  attribute. React reads the attribute back rather than deciding again, so the
  two can never disagree.
- **Every screenshot is captured twice**, and the page swaps the file. The app's
  two schemes are not inversions of each other: each accent is a pair, a bright
  cut for the black canvas and a deepened cut for the white one. A filtered or
  inverted screenshot would show a product that does not exist.

## Where the content comes from

Nothing on these pages is invented.

- **The pitch** is the App Store description, in the same voice, because they
  describe the same product to the same person.
- **The screenshots** are the real app running with its `-seed` launch argument:
  the phone, watch and iPad from simulators, and the Mac window and menu bar
  panel from the Mac app capturing itself. Not mockups, and the device frames
  are drawn rather than photographed.
- **The hero's five blocks** are the one picture that is drawn rather than
  captured, so they stay sharp and follow the scheme. Every title, number and
  colour in them is the seeded home screen's, and `SLOTS` in `src/lib/site.ts`
  says where each came from.
- **The design tokens** in `src/theme.ts` are `DS` from
  `GoalsKit/Sources/GoalsKit/Design/DesignTokens.swift`, hex for hex, in both
  schemes.
- **The icon** in `src/components/Mark.tsx` is `Tools/make-app-icon.py` from the
  Goals repo, ratio for ratio, drawn as SVG so it stays sharp.
- **The photograph** is the same one the app's own paywall shows, so the face on
  the site and the face in the app are one person rather than two.
- **The prices** are the App Store Connect products, and the 44% saving is the
  real arithmetic rather than a rounder number chosen for the page.
- **The privacy claims** were each checked against the app rather than
  remembered. It has no third party dependencies and no server. Its only
  connections are to Apple: iCloud for sync, which is on by default and can be
  turned off, and the App Store for purchases. The Mac's AI agent connection is
  local, off by default, and never listens on the network.

## Commands

```bash
npm install
npm run dev
```

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

`npm test` includes a test that fails on an em dash or an en dash in rendered
copy. That is a house rule about voice, and it is a test because it has already
been caught by eye once.

## Regenerating the images

The raw captures live in `src/shots/` and are committed, so the whole image
pipeline reproduces without going back to a simulator:

```bash
python3 scripts/make-images.py
```

That resizes every screenshot, crops the widget shots down to the widgets, and
draws the two things that are not photographs of anything: the app icon and the
social card.

Recapturing needs a booted simulator with the app installed and seeded:

```bash
xcrun simctl ui booted appearance dark
xcrun simctl launch booted com.flavin.goals -seed
xcrun simctl openurl booted goals://habits
xcrun simctl io booted screenshot src/shots/habits-dark.png
```

Every phone screen is captured once per appearance. The watch shot comes from
the paired watch simulator running `GoalsWatch`, which has no light mode and so
has one capture. Screenshots go stale when the app's UI changes and nothing
detects it.

### The iPad

Two things differ from the phone. The seed has to go into a store that does
not sync, because the CloudKit Development database is shared by every
simulator on the account. And a simulator has no subscription, so without
`-subscription.grandfathered 5` four of the five goals come up as drafts, which
is not the product the page is selling. Both are argument-domain overrides:
they apply to this launch and write nothing.

```bash
xcrun simctl launch <ipad> com.flavin.goals -store-name landing -sync.icloud "<false/>" -subscription.grandfathered 5 -seed -drive skip-onboarding
xcrun simctl status_bar <ipad> override --time 9:41 --batteryState charged --batteryLevel 100
xcrun simctl io <ipad> screenshot src/shots/ipad-dark.png
```

### The Mac

There is no simulator, so a Debug run on this machine shares its App Group
with the real Goals. Every override below exists to keep it off the real data
and the real settings:

- `-store-name landing` opens a store of its own, and `-sync.icloud "<false/>"`
  keeps it from mirroring. Plain `NO` does not work (the Goals repo's LESSONS.md
  says why). Run once with `-dump-goals -quit-after-sync` first and confirm
  the log says zero goals before seeding.
- `-mcp.enabled "<false/>"` stops the debug copy taking over the agent socket
  from the real app.
- `-mac.dock.shown "<true/>"` makes the window open even if the real app is set
  to live in the menu bar.

The app cannot write outside its sandbox, so it PUTs its captures to a
loopback URL: run any small server on `127.0.0.1:8765` that saves PUT bodies.

```bash
Goals.app/Contents/MacOS/Goals -store-name landing -sync.icloud "<false/>" -mcp.enabled "<false/>" -mac.dock.shown "<true/>" -seed -appearance dark -window-size 1060x680 -snapshot-to http://127.0.0.1:8765 -drive slot:0 -drive panel
```

That writes `window-dark.png` (the window, saved as `mac-dark.png`) and
`window-dark-1.png` (the menu bar panel, saved as `menubar-dark.png`). Keep the
pointer away from where the window and the panel open: a block under it is
captured mid hover, lifted out of line.
