#!/usr/bin/env python3
"""Draws the two images this site cannot write as markup: the app icon and the
social card.

The icon is a literal port of `Tools/make-app-icon.py` in the Goals repo — the
same accent, the same tick geometry, the same ratios. If that file moves, this
one moves with it, or the site starts showing an icon the App Store does not.

    python3 scripts/make-images.py

Everything else on this site is drawn in CSS or is a screenshot of the running
app, so this script is the whole of the generated-asset story.
"""

from PIL import Image, ImageDraw, ImageFont

ACCENT = (0x25, 0x63, 0xEB)  # DS.Accent.blue, light-scheme value
INK = (0xFF, 0xFF, 0xFF)
CANVAS = (0x00, 0x00, 0x00)
SECONDARY = (0x8E, 0x8E, 0x93)

CHECK_RADIUS = 0.40  # of the icon's width, the tick's bounding radius
CHECK_WEIGHT = 0.34  # stroke weight as a ratio of that radius
CORNER = 0.2237      # iOS icon corner radius as a ratio of the side

FONT = "/System/Library/Fonts/SFNS.ttf"


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


def social():
    """1200x630, the card a link to this site unfurls as."""
    width, height = 1200, 630
    image = Image.new("RGB", (width, height), CANVAS)
    draw = ImageDraw.Draw(image)

    mark = icon(132)
    image.paste(mark, (88, 132), mark)

    # SFNS is variable, and its axes are [Width, Optical Size, GRAD, Weight] in
    # that order. Passing one number sets Width, which is why an earlier version
    # of this drew a condensed regular where it wanted a bold.
    title = ImageFont.truetype(FONT, 78)
    title.set_variation_by_axes([100, 96, 400, 700])
    body = ImageFont.truetype(FONT, 34)
    body.set_variation_by_axes([100, 34, 400, 400])

    draw.text((88, 312), "Five goals. One year.", font=title, fill=INK)
    draw.text(
        (88, 424),
        "A goal tracker for iPhone and Apple Watch.\nNothing leaves the device.",
        font=body,
        fill=SECONDARY,
        spacing=14,
    )
    return image


def main():
    for size, name in [(512, "icon-512.png"), (180, "apple-touch-icon.png"), (64, "favicon.png")]:
        icon(size).save(f"public/{name}")
        print(f"wrote public/{name}")
    social().save("public/images/social.png")
    print("wrote public/images/social.png")


if __name__ == "__main__":
    main()
