#!/usr/bin/env python3
"""Draws the two things on the site that are not pictures of the app: the app
icon (at three sizes, for the favicon, the touch icon and the 512px icon) and the
photograph the maker's note shows.

    python3 scripts/make-images.py

The device mockups and the social card are drawn by bezl instead, from the raw
captures in `src/shots/`: see `scripts/make-mockups.mjs` (`npm run mockups`).
The README has the capture recipes.
"""

import os
from PIL import Image, ImageDraw

ACCENT = (0x25, 0x63, 0xEB)  # DS.Accent.blue, light-scheme value
INK = (0xFF, 0xFF, 0xFF)

CHECK_RADIUS = 0.40  # of the icon's width, the tick's bounding radius
CHECK_WEIGHT = 0.34  # stroke weight as a ratio of that radius
CORNER = 0.2237      # iOS icon corner radius as a ratio of the side


SRC = "src/shots"
OUT = "public/images"

def tick(draw, size, origin=(0, 0)):
    """The white tick, centred in a `size` square at `origin`."""
    radius = size * CHECK_RADIUS
    cx = origin[0] + size / 2
    cy = origin[1] + size / 2
    weight = max(1, round(radius * CHECK_WEIGHT))
    points = [
        (cx - radius * 0.52, cy + radius * 0.02),
        (cx - radius * 0.13, cy + radius * 0.42),
        (cx + radius * 0.56, cy - radius * 0.44),
    ]
    draw.line(points, fill=INK, width=weight, joint="curve")
    for end in (points[0], points[-1]):
        draw.ellipse(
            [end[0] - weight / 2, end[1] - weight / 2, end[0] + weight / 2, end[1] + weight / 2],
            fill=INK,
        )


def icon(size, rounded=True):
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    if rounded:
        draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=size * CORNER, fill=ACCENT)
    else:
        draw.rectangle([0, 0, size, size], fill=ACCENT)
    tick(draw, size)
    return image


def save(image, path):
    image.save(path, optimize=True)
    print(f"wrote {path} ({os.path.getsize(path) // 1024} KB)")


def main():
    os.makedirs(OUT, exist_ok=True)

    # The same photograph the app's own paywall shows, so the face on the site
    # and the face in the app are one person rather than two.
    save(Image.open(f"{SRC}/jake.jpg").convert("RGB"), f"{OUT}/jake.jpg")

    for size, name in [(512, "icon-512.png"), (180, "apple-touch-icon.png"), (64, "favicon.png")]:
        icon(size).save(f"public/{name}")
        print(f"wrote public/{name}")


if __name__ == "__main__":
    main()
