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

- **The pitch** follows the app as it is now: one goal free, and any number
  with Goals Plus (`src/lib/site.ts`, and the app's own paywall). The App Store
  subtitle, description and promo text still sell five slots and have to be
  rewritten in App Store Connect to match.
- **The screenshots** are the real app running with its `-seed` launch argument:
  the phone and iPad from simulators, and the Mac window and menu bar panel
  from the Mac app capturing itself. The device frames around them are drawn by
  [bezl](https://github.com/jakeflavin/bezl) (`@jakeflavin/bezl`) to Apple's
  published dimensions, not photographed and not bundled.
- **The lock in card's progress bar** is the one picture drawn in code, so it
  can fill as it comes into view. Its title, numbers and colour are the seeded
  Run a marathon's, read off its page in the app.
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
  remembered. It has no server and no analytics, crash reporting or tracking
  code; its only third party code is the Model Context Protocol library in the
  Mac app, for the local agent connection. Its only connections are to Apple:
  iCloud for sync, which is on by default and can be turned off, and the App
  Store for purchases. The Mac's AI agent connection is local, off by default,
  and never listens on the network.

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
npm run mockups
```

```bash
python3 scripts/make-images.py
```

`npm run mockups` (`scripts/make-mockups.mjs`) puts every capture in its bezl
frame, in both schemes, cuts the two widgets out of the Home Screen capture,
draws the social card, and writes AVIF and WebP at each width the page asks
for into `public/mockups/`, with their sizes in `src/lib/mockups.json`. It runs
one headless Chrome worker at a time and takes about half a minute.
`make-images.py` draws the app icon at three sizes and copies the photograph.

### Recapturing

Screenshots go stale when the app's UI changes, and nothing detects it.

**Seeding is the dangerous part.** The CloudKit Development database is shared
by every simulator and Debug build on the account, and a seed that reaches it
lands on every one of them; it has happened twice. So the phone and iPad are
captured on simulators created for it and never signed in to iCloud, launched
with sync off as well:

```bash
xcrun simctl create "Goals Web iPhone" com.apple.CoreSimulator.SimDeviceType.iPhone-18-Pro com.apple.CoreSimulator.SimRuntime.iOS-27-0
```

```bash
xcrun simctl create "Goals Web iPad" com.apple.CoreSimulator.SimDeviceType.iPad-Pro-13-inch-M5-12GB com.apple.CoreSimulator.SimRuntime.iOS-27-0
```

Install the Debug build, then launch it once per screen and scheme. A simulator
has no subscription, so the launch also hands it a cached Goals Plus
entitlement, or the seeded goals past the free one would show the plan's mark.
These are argument-domain overrides: they apply to this launch and write
nothing.

```bash
B64=$(printf '%s' '{"level":"yearly","resolvedAt":0,"isInBillingRetry":false,"willNotRenew":false}' | base64)
xcrun simctl ui <udid> appearance dark
xcrun simctl status_bar <udid> override --time 9:41 --batteryState charged --batteryLevel 100 --cellularBars 4 --wifiBars 3 --dataNetwork wifi
xcrun simctl launch <udid> com.flavin.goals -sync.icloud "<false/>" -subscription.snapshot "<data>$B64</data>" -seed -drive skip-onboarding -drive slot:0
xcrun simctl io <udid> screenshot src/shots/detail-dark.png
```

The `-drive` steps start six seconds after the window appears and run 1.5 s
apart, and a cold Debug launch takes ten seconds or more, so wait about 30
seconds before the screenshot. The steps for each capture:

| Capture | Steps |
|---|---|
| `home` | none |
| `detail` | `slot:0` |
| `tasks`, `habits` | `goals://tasks`, `goals://habits` |
| `habitdetail` | `goals://habit/<uuid of Run>` (the seeded habits share a position, so `habit-detail:first` can open another) |
| `settings` | `settings` |
| `homeadd` | `slot:3 archive-open` (archives Learn sourdough, so Home shows four goals and the Set a goal block) |
| `archived` | `show-archived archived:0` |
| `ipad`, `ipad-habits` | none, `goals://habits` |

The watch capture (`watch.png`) is older and still accurate; this Mac has no
watchOS runtime. The widgets capture is a whole Home Screen, and only the two
widgets on it are used.

### The Mac

There is no simulator, so a Debug run on this machine shares its App Group
with the real Goals. Every override below exists to keep it off the real data
and the real settings:

- `-store-name webcap` opens a store of its own, and `-sync.icloud "<false/>"`
  keeps it from mirroring. Plain `NO` does not work (the Goals repo's LESSONS.md
  says why). Run once with `-dump-goals -quit-after-sync` first and confirm
  the log says zero goals before seeding, and again after capturing to
  confirm all five are still locked in.
- `-mcp.enabled "<false/>"` stops the debug copy taking over the agent socket
  from the real app.
- `-mac.dock.shown "<true/>"` makes the window open even if the real app is set
  to live in the menu bar.
- `-habits.grace 0` keeps the real app's Streak grace, a setting each device
  keeps for itself, from bridging the seed's missed days: without it, the Mac's
  Run streak read 63 where every other capture reads 3.
- `-subscription.paidEnvironments "<array/>"` keeps the lapse guard out of the
  capture. A Debug build here reads the account's expired sandbox
  subscription, and the lapse bookkeeping the real app keeps in the shared App
  Group let a capture run release three of the seeded goals to drafts on
  2026-10-05 (in the capture store only). With no recorded paid read, the guard
  returns before it reads or writes anything.

The app cannot write outside its sandbox, so it PUTs its captures to a
loopback URL: run any small server on `127.0.0.1:8765` that saves PUT bodies.

```bash
Goals.app/Contents/MacOS/Goals -store-name webcap -sync.icloud "<false/>" -mcp.enabled "<false/>" -mac.dock.shown "<true/>" -habits.grace 0 -subscription.paidEnvironments "<array/>" -subscription.snapshot "<data>$B64</data>" -seed -appearance dark -window-size 1060x680 -snapshot-to http://127.0.0.1:8765 -drive slot:0 -drive panel
```

Every visible window comes back as `window-dark*.png`: the 2120 by 1360 one is
the window (save it as `mac-dark.png`) and the 562 by 1146 one is the menu bar
panel (`menubar-dark.png`). Keep the pointer away from where the window and
the panel open: a block under it is captured mid hover, lifted out of line.
