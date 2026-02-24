import { useState, useEffect, useRef, useCallback } from 'react'

interface UseExitIntentOptions {
  enabled: boolean
  threshold?: number
  minDelay?: number
}

export function useExitIntent({ enabled, threshold = 0, minDelay = 45000 }: UseExitIntentOptions) {
  const [showModal, setShowModal] = useState(false)
  const hasShown = useRef(false)
  const startTime = useRef(Date.now())

  // Reset start time when enabled changes
  useEffect(() => {
    if (enabled) {
      startTime.current = Date.now()
    }
  }, [enabled])

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (!enabled || hasShown.current) return
      // Don't show until minDelay has passed
      if (Date.now() - startTime.current < minDelay) return
      if (e.clientY <= threshold) {
        hasShown.current = true
        setShowModal(true)
      }
    },
    [enabled, threshold, minDelay]
  )

  useEffect(() => {
    // Only on desktop (no touch)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch || !enabled) return

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [enabled, handleMouseLeave])

  const dismiss = useCallback(() => setShowModal(false), [])

  return { showModal, dismiss }
}
