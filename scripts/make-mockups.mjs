#!/usr/bin/env node
/**
 * Draws the landing page's device mockups from the raw captures in `src/shots`,
 * and writes them for the web.
 *
 *     npm run mockups
 *
 * The frames come from bezl (`@jakeflavin/bezl`), which draws each Apple device
 * in code to its published dimensions, so nothing here is a photograph or a
 * bundled bezel. Each capture goes into the finish that suits its scheme: a
 * light screen in a silver frame, a dark one in black. The watch has one
 * capture, because the watch app is always dark, and two bands.
 *
 * **No shadow is baked in.** A baked shadow is black at some alpha, which reads
 * on the white page and vanishes on the black one. The page draws it with CSS,
 * so it follows the theme the reader picked.
 *
 * The widgets are not framed: they are cut out of a Home Screen capture and
 * given back their own rounded corners, because the rest of that capture is
 * somebody's Home Screen. The menu bar panel is not framed either; it is a
 * panel, and arrives with its corners already cut.
 *
 * Writes:
 * - `.mockups/` the lossless renders (ignored by git, a cache for this script)
 * - `public/mockups/<name>-<scheme>-<width>.avif|webp` what the page loads
 * - `src/lib/mockups.json` each mockup's size, which the page reads to set
 *   width and height and build its srcset
 * - `public/images/social.png` the card a link to the site unfurls as
 *
 * Renders one Chrome worker at a time: this runs on an 8 GB Mac.
 */
import { renderBatch } from '@jakeflavin/bezl'
import sharp from 'sharp'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SHOTS = path.join(ROOT, 'src/shots')
const MASTERS = path.join(ROOT, '.mockups')
const OUT = path.join(ROOT, 'public/mockups')
const MANIFEST = path.join(ROOT, 'src/lib/mockups.json')
const SCHEMES = ['light', 'dark']
const DENSITY = 2

/**
 * Each frame: its canvas in CSS pixels, sized to the frame's own aspect so the
 * device fills it edge to edge (iPhone 18 Pro 0.4838, iPad Pro 13 0.7663, the
 * watch with its band 0.5166, measured with `bezl --dry-run`), the bezl layer,
 * the finish per scheme, and the widths the page asks for.
 */
const FRAMES = {
  iphone: {
    canvas: [388, 800],
    layer: { model: 'iphone-18-pro' },
    finish: { light: { color: 'silver' }, dark: { color: 'black' } },
    widths: [400, 776],
  },
  ipad: {
    canvas: [614, 800],
    layer: { model: 'ipad-pro-13' },
    finish: { light: { color: 'silver' }, dark: { color: 'space-black' } },
    widths: [620, 1228],
  },
  // The Mac capture is the window drawing itself, title band and traffic
  // lights included, so it needs corners and nothing else. bezl's own
  // `window=mac` would draw a second title bar above the app's.
  mac: {
    canvas: [1060, 680],
    layer: { model: 'none', radius: 32 },
    widths: [800, 1400, 2120],
  },
  watch: {
    canvas: [208, 402],
    layer: { model: 'watch-series-12-46' },
    // Titanium in both schemes: a black watch on a black page is a screen
    // floating on nothing. The band darkens with the page instead.
    finish: {
      light: { color: 'natural-titanium', band: '#d6d3cd' },
      dark: { color: 'natural-titanium', band: '#3a3a3c' },
    },
    widths: [208, 416],
  },
}

/** The page's name for each mockup, its frame, and its capture in `src/shots`. */
const MOCKUPS = [
  { name: 'home', frame: 'iphone', shot: 'home' },
  { name: 'home-add', frame: 'iphone', shot: 'homeadd' },
  { name: 'detail', frame: 'iphone', shot: 'detail' },
  { name: 'tasks', frame: 'iphone', shot: 'tasks' },
  { name: 'habits', frame: 'iphone', shot: 'habits' },
  { name: 'habit', frame: 'iphone', shot: 'habitdetail' },
  { name: 'archived', frame: 'iphone', shot: 'archived' },
  { name: 'settings', frame: 'iphone', shot: 'settings' },
  { name: 'ipad', frame: 'ipad', shot: 'ipad' },
  { name: 'ipad-habits', frame: 'ipad', shot: 'ipad-habits' },
  { name: 'mac', frame: 'mac', shot: 'mac' },
  { name: 'watch', frame: 'watch', shot: 'watch', oneCapture: true },
]

/**
 * The two widgets on `widgets-<scheme>.png`, in capture pixels, measured from
 * the capture: a medium Tasks widget and a small goal widget. 84 px is their
 * corner radius at 3x.
 */
const WIDGETS = [
  { name: 'widget-tasks', box: [79, 270, 1128, 763], widths: [540, 1049] },
  { name: 'widget-goal', box: [79, 872, 572, 1365], widths: [260, 493] },
]
const WIDGET_RADIUS = 84

/**
 * The menu bar panel needs no frame and no cut: the capture is the panel
 * drawing itself, with its own rounded, anti-aliased corners as transparency.
 * Through bezl those corners came back opaque, so it is copied as it is.
 * Captured at 2x.
 */
const PANEL = { name: 'menubar', shot: 'menubar', widths: [281, 562] }

/**
 * The card a shared link unfurls as, 1200 by 630: the headline on the left in
 * SF Pro Display, the app's blue behind it (the icon's own fill), and Home on a
 * silver iPhone running off the bottom edge. Flat, like the app.
 */
const SOCIAL = {
  canvas: 'og',
  density: 1,
  background: '#2563EB',
  output: path.join(ROOT, 'public/images/social.png'),
  layers: [
    {
      type: 'text',
      text: 'A goal tracker for the year',
      x: 0.33,
      y: 0.4,
      width: 0.52,
      size: 66,
      weight: 600,
      align: 'left',
      font: 'SF Pro Display',
      color: '#FFFFFF',
      letterSpacing: -0.025,
    },
    {
      type: 'text',
      text: 'For iPhone, iPad, Mac and Apple Watch. One goal is free, and Goals Plus holds any number.',
      x: 0.33,
      y: 0.62,
      width: 0.52,
      size: 27,
      weight: 400,
      align: 'left',
      font: 'SF Pro Display',
      color: '#FFFFFF',
      opacity: 0.86,
      lineHeight: 1.35,
    },
    {
      type: 'device',
      input: path.join(SHOTS, 'home-light.png'),
      model: 'iphone-18-pro',
      color: 'silver',
      x: 0.8,
      y: 0.74,
      height: 1.18,
      shadow: 'medium',
    },
  ],
}

const capture = (shot, scheme, oneCapture) =>
  path.join(SHOTS, oneCapture ? `${shot}.png` : `${shot}-${scheme}.png`)

async function renderFrames() {
  await mkdir(MASTERS, { recursive: true })
  const docs = []
  for (const mockup of MOCKUPS) {
    const frame = FRAMES[mockup.frame]
    for (const scheme of SCHEMES) {
      docs.push({
        canvas: `${frame.canvas[0]}x${frame.canvas[1]}`,
        density: DENSITY,
        background: 'transparent',
        output: path.join(MASTERS, `${mockup.name}-${scheme}.png`),
        layers: [
          {
            type: 'device',
            input: capture(mockup.shot, scheme, mockup.oneCapture),
            x: 0.5,
            y: 0.5,
            height: 1,
            shadow: 'none',
            ...frame.layer,
            ...frame.finish?.[scheme],
          },
        ],
      })
    }
  }
  docs.push(SOCIAL)
  const results = await renderBatch(docs, {
    baseDir: ROOT,
    workers: 1,
    embed: false,
    onItem: (done, total) => process.stdout.write(`\rframes ${done}/${total}`),
  })
  process.stdout.write('\n')
  return results
}

async function cutWidgets() {
  for (const widget of WIDGETS) {
    const [left, top, right, bottom] = widget.box
    const width = right - left
    const height = bottom - top
    const mask = Buffer.from(
      `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${WIDGET_RADIUS}" ry="${WIDGET_RADIUS}"/></svg>`,
    )
    for (const scheme of SCHEMES) {
      await sharp(path.join(SHOTS, `widgets-${scheme}.png`))
        .extract({ left, top, width, height })
        .ensureAlpha()
        .composite([{ input: mask, blend: 'dest-in' }])
        .png()
        .toFile(path.join(MASTERS, `${widget.name}-${scheme}.png`))
    }
  }
}

async function copyPanel() {
  for (const scheme of SCHEMES) {
    await sharp(path.join(SHOTS, `${PANEL.shot}-${scheme}.png`))
      .ensureAlpha()
      .png()
      .toFile(path.join(MASTERS, `${PANEL.name}-${scheme}.png`))
  }
}

async function encode(name, widths) {
  const sizes = {}
  for (const scheme of SCHEMES) {
    const master = path.join(MASTERS, `${name}-${scheme}.png`)
    const meta = await sharp(master).metadata()
    sizes[scheme] = [meta.width, meta.height]
    for (const width of widths) {
      const base = path.join(OUT, `${name}-${scheme}-${width}`)
      const resized = () => sharp(master).resize({ width, withoutEnlargement: true })
      await resized().avif({ quality: 55, effort: 4 }).toFile(`${base}.avif`)
      await resized().webp({ quality: 82, alphaQuality: 90, effort: 5 }).toFile(`${base}.webp`)
    }
  }
  // Both schemes share one size: the frames match, and so do the captures.
  const [w, h] = sizes.light
  return { width: Math.round(w / DENSITY), height: Math.round(h / DENSITY), widths }
}

async function main() {
  await renderFrames()
  await cutWidgets()
  await copyPanel()
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })
  const manifest = {}
  for (const mockup of MOCKUPS) {
    manifest[mockup.name] = await encode(mockup.name, FRAMES[mockup.frame].widths)
    console.log('encoded', mockup.name)
  }
  manifest[PANEL.name] = await encode(PANEL.name, PANEL.widths)
  console.log('encoded', PANEL.name)
  for (const widget of WIDGETS) {
    const entry = await encode(widget.name, widget.widths)
    // Cut at 3x, so the CSS size is a third of the pixels, not a half.
    const [left, top, right, bottom] = widget.box
    manifest[widget.name] = {
      ...entry,
      width: Math.round((right - left) / 3),
      height: Math.round((bottom - top) / 3),
    }
    console.log('encoded', widget.name)
  }
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log('wrote', path.relative(ROOT, MANIFEST))
}

await main()
