import { useEffect, useRef, useState, type RefObject } from 'react'
import { trackHeroView, trackScroll50 } from '@/lib/analytics'

interface UseHeroScrollOptions {
  heroSectionRef: RefObject<HTMLElement | null>
  finalCtaRef: RefObject<HTMLElement | null>
}

interface UseHeroScrollReturn {
  heroInView: boolean
  finalCtaInView: boolean
  scroll50SentinelRef: RefObject<HTMLDivElement | null>
}

export function useHeroScroll({ heroSectionRef, finalCtaRef }: UseHeroScrollOptions): UseHeroScrollReturn {
  const [heroInView, setHeroInView] = useState(true)
  const [finalCtaInView, setFinalCtaInView] = useState(false)
  const scroll50SentinelRef = useRef<HTMLDivElement | null>(null)
  const scroll50Fired = useRef(false)
  const heroViewFired = useRef(false)

  // Fire hero_view once on mount
  useEffect(() => {
    if (!heroViewFired.current) {
      heroViewFired.current = true
      trackHeroView()
    }
  }, [])

  // Observer 1: hero section visibility (controls sticky bar)
  useEffect(() => {
    const el = heroSectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [heroSectionRef])

  // Observer 2: final CTA section visibility (hides sticky bar)
  useEffect(() => {
    const el = finalCtaRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setFinalCtaInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [finalCtaRef])

  // Observer 3: scroll_50 sentinel (fire event once)
  useEffect(() => {
    const el = scroll50SentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !scroll50Fired.current) {
          scroll50Fired.current = true
          trackScroll50()
        }
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { heroInView, finalCtaInView, scroll50SentinelRef }
}
