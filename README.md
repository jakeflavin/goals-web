# Goals, the site

The landing page, privacy policy and support page for **Goals**, the iOS and
watchOS goal tracker. Served from a sub-path of the portfolio at
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

## Where the content comes from

Nothing on these pages is invented.

- **The pitch** is the App Store description, in the same voice, because they
  describe the same product to the same person.
- **The screenshots** are the real app running with its `-seed` launch argument,
  captured from a simulator. Not mockups, and no drawn device frames.
- **The design tokens** in `src/theme.ts` are `DS` from
  `GoalsKit/Sources/GoalsKit/Design/DesignTokens.swift`, hex for hex.
- **The icon** in `src/components/Mark.tsx` is `Tools/make-app-icon.py` from the
  Goals repo, ratio for ratio, drawn as SVG so it stays sharp.
- **The privacy claims** were each checked against the app rather than
  remembered. The app has no third party dependencies, makes no network requests
  of its own, and stores everything in its own container.

The page is dark and only dark. The black canvas with one blue accent is the
app's face, and a light variant would show something nobody who downloads it
sees first.

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

The icon files and the social card are drawn rather than hand made:

```bash
python3 scripts/make-images.py
```

Screenshots are recaptured by building the Goals app for a simulator, launching
it with `-seed`, and taking them by hand. They go stale when the app's UI
changes and nothing detects it.
