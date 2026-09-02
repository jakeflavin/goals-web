import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * The spacing rules, as a test.
 *
 * Both of these had already gone wrong once. The breakpoints drifted to five
 * different values (560, 720, 800, 900, 980), each picked for the one component
 * it was written in, which is how a page ends up rearranging itself four times
 * between a tablet and a phone. The raw pixel values crept in the same way.
 *
 * Neither is something an eye catches on a screenshot, so neither is left to
 * one.
 */

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return sources(path)
    if (!/\.tsx?$/.test(entry.name) || /\.test\./.test(entry.name)) return []
    return [path]
  })
}

const FILES = sources('src').map((path) => ({ path, text: readFileSync(path, 'utf8') }))

describe('the breakpoints', () => {
  it('are named rather than written out', () => {
    const offenders = FILES.flatMap(({ path, text }) =>
      [...text.matchAll(/@media \(max-width: (\d+)px\)/g)].map(
        (match) => `${path}: ${match[0]}`,
      ),
    )
    expect(offenders).toEqual([])
  })

  it('are the three in the theme and no others', () => {
    const used = new Set(
      FILES.flatMap(({ text }) => [...text.matchAll(/theme\.bp\.(\w+)/g)].map((m) => m[1])),
    )
    expect([...used].toSorted()).toEqual(['lg', 'md', 'sm'])
  })
})

describe('the spacing scale', () => {
  it('is the only source of gaps, padding and margins', () => {
    // Anything with a pixel value that is not on the scale, excluding the
    // places a raw number is the honest answer: hairlines, the drawn hardware
    // in the phone and watch frames, and an image's own dimensions.
    const ALLOWED = /^(0|1|2|3)px$/
    const offenders: string[] = []

    for (const { path, text } of FILES) {
      if (path.endsWith('Frame.tsx')) continue
      for (const line of text.split('\n')) {
        const declaration = /^\s*(gap|padding|margin)(-\w+)?:\s*(.+);\s*$/.exec(line)
        if (!declaration) continue
        const values = declaration[3].match(/\d+px/g) ?? []
        if (values.every((value) => ALLOWED.test(value))) continue
        offenders.push(`${path}: ${line.trim()}`)
      }
    }

    expect(offenders).toEqual([])
  })
})
