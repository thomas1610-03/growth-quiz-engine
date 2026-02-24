import { useCallback, useEffect } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { EmailGate } from '@/components/quiz/EmailGate'
import { trackEmailGateView, trackEmailSubmit } from '@/lib/analytics'

export function EmailGatePage() {
  const { setAnswer, goToScreen, prevStep } = useQuiz()

  useEffect(() => {
    trackEmailGateView()
  }, [])

  const handleSubmit = useCallback(
    (data: { firstName: string; email: string; phone: string; postalCode: string; consent: boolean }) => {
      setAnswer('firstName', data.firstName)
      setAnswer('email', data.email)
      setAnswer('emailConsent', data.consent)
      if (data.phone) setAnswer('phone', data.phone)
      if (data.postalCode) setAnswer('postalCode', data.postalCode)
      trackEmailSubmit(data.consent)
      // Go directly to loading (no more persona question)
      goToScreen('loading')
    },
    [setAnswer, goToScreen]
  )

  return (
    <EmailGate
      onSubmit={handleSubmit}
      onBack={prevStep}
      progress={88}
    />
  )
}
