/**
 * The app icon, drawn rather than linked.
 *
 * The geometry is `Tools/make-app-icon.py` in the Goals repo, ratio for ratio:
 * a full-bleed `DS.Accent.blue` fill with one heavy white tick at 0.40 of the
 * width, stroked at 0.34 of that radius. Drawing it means the header mark is
 * sharp at any size and is the same shape as the icon on the home screen, which
 * a downscaled PNG of a 1024px square is not.
 */
export function Mark({ size = 28, title }: { size?: number; title?: string }) {
  const box = 1024
  const radius = box * 0.4
  const centre = box / 2
  const weight = Math.round(radius * 0.34)
  const points = [
    [centre - radius * 0.52, centre + radius * 0.02],
    [centre - radius * 0.13, centre + radius * 0.42],
    [centre + radius * 0.56, centre - radius * 0.44],
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${box} ${box}`}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {/* 0.2237 of the side is the iOS icon corner radius. */}
      <rect width={box} height={box} rx={box * 0.2237} fill="#2563EB" />
      <polyline
        points={points.map(([x, y]) => `${x},${y}`).join(' ')}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
