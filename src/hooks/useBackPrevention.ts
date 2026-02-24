import { useEffect } from 'react'

export function useBackPrevention(
  onBack: () => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return

    // Push initial state so we have something to go back to
    window.history.pushState({ quizStep: true }, '')

    const handlePopState = () => {
      // Re-push state to prevent leaving the page
      window.history.pushState({ quizStep: true }, '')
      onBack()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [onBack, enabled])
}
