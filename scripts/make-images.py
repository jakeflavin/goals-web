#!/usr/bin/env python3
"""Turns the raw captures in `src/shots/` into the images the site ships, and
draws the two things that are not photographs of anything: the app icon and the
social card.

    python3 scripts/make-images.py

Raw captures are committed under `src/shots/` so this is reproducible without
going back to a simulator. They come from:

    xcrun simctl ui <device> appearance dark|light
    xcrun simctl openurl <device> goals://home        # also habits, tasks
    xcrun simctl io <device> screenshot out.png

and the watch shot from the paired watch simulator running `GoalsWatch`. Every
phone screen is captured twice, once per appearance, because the site has a
light mode and a screenshot that ignores it is worse than no screenshot.
"""

import os
from PIL import Image, ImageDraw, ImageFont

ACCENT = (0x25, 0x63, 0xEB)  # DS.Accent.blue, light-scheme value
INK = (0xFF, 0xFF, 0xFF)
CANVAS = (0x00, 0x00, 0x00)
SECONDARY = (0x8E, 0x8E, 0x93)

CHECK_RADIUS = 0.40  # of the icon's width, the tick's bounding radius
CHECK_WEIGHT = 0.34  # stroke weight as a ratio of that radius
CORNER = 0.2237      # iOS icon corner radius as a ratio of the side

FONT = "/System/Library/Fonts/SFNS.ttf"

SRC = "src/shots"
OUT = "public/images"

# Phone screens, both appearances. 720px wide is a 3x phone at 240 CSS px, which
# is about as large as any of them is ever drawn on the page.
PHONES = ["home", "detail", "habits", "tasks", "habitdetail"]
PHONE_WIDTH = 720

# The widget shot is a whole home screen; only the two widgets are the point, so
# it is cut down to them. Left, top, right, bottom in the capture's own pixels.
WIDGET_CROP = (0, 200, 1206, 1450)
WIDGET_WIDTH = 860


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


def scale(image, width):
    return image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)


def save(image, path):
    image.save(path, optimize=True)
    print(f"wrote {path} ({os.path.getsize(path) // 1024} KB)")


def main():
    os.makedirs(OUT, exist_ok=True)

    for name in PHONES:
        for scheme in ("light", "dark"):
            source = Image.open(f"{SRC}/{name}-{scheme}.png").convert("RGB")
            save(scale(source, PHONE_WIDTH), f"{OUT}/{name}-{scheme}.png")

    # JPEG, not PNG: most of this crop is a photographic wallpaper, and as a PNG
    # it was half a megabyte for a picture drawn 540px wide.
    for scheme in ("light", "dark"):
        source = Image.open(f"{SRC}/widgets-{scheme}.png").convert("RGB").crop(WIDGET_CROP)
        path = f"{OUT}/widgets-{scheme}.jpg"
        scale(source, WIDGET_WIDTH).save(path, quality=88, optimize=True, progressive=True)
        print(f"wrote {path} ({os.path.getsize(path) // 1024} KB)")

    # The watch screen is captured at its own size and is never drawn larger.
    save(Image.open(f"{SRC}/watch.png").convert("RGB"), f"{OUT}/watch.png")

    # The same photograph the app's own paywall shows, so the face on the site
    # and the face in the app are one person rather than two.
    save(Image.open(f"{SRC}/jake.jpg").convert("RGB"), f"{OUT}/jake.jpg")

    for size, name in [(512, "icon-512.png"), (180, "apple-touch-icon.png"), (64, "favicon.png")]:
        icon(size).save(f"public/{name}")
        print(f"wrote public/{name}")
    save(social(), f"{OUT}/social.png")


if __name__ == "__main__":
    main()
