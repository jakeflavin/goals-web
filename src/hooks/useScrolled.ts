import { useEffect, useState } from 'react'

/**
 * Whether the page has scrolled past `offset` pixels.
 *
 * The header reads it to stay out of the way over the hero, with no ground of
 * its own, and to take a frosted one once there is something underneath it to
 * frost. One passive listener, read once a frame at most.
 */
export function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      setScrolled(window.scrollY > offset)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [offset])

  return scrolled
}
