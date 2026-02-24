import { useCallback, useEffect, useMemo } from 'react'
import { QuizProvider, useQuiz, QUIZ_STEPS } from '@/context/QuizContext'
import { AppRouter } from '@/router'
import { Toaster } from '@/components/ui/sonner'
import { ExitIntentModal } from '@/components/quiz/ExitIntentModal'
import { useExitIntent } from '@/hooks/useExitIntent'
import { useBackPrevention } from '@/hooks/useBackPrevention'
import { captureUTMParams, trackQuizStep, trackExitIntent } from '@/lib/analytics'

// Exit intent activates from Q5 onwards (deeper in quiz)
const EXIT_INTENT_START = QUIZ_STEPS.indexOf('q5-approach')

function AppContent() {
  const { state, currentScreen, prevStep, goToScreen } = useQuiz()

  const isInQuiz = state.currentStep >= EXIT_INTENT_START &&
    currentScreen !== 'result' &&
    currentScreen !== 'loading' &&
    currentScreen !== 'thank-you'

  const { showModal, dismiss } = useExitIntent({ enabled: isInQuiz })

  // Capture UTM params on mount
  useEffect(() => {
    captureUTMParams()
  }, [])

  // Track step changes
  useEffect(() => {
    if (state.currentStep > 0) {
      trackQuizStep(currentScreen, state.currentStep, QUIZ_STEPS.length)
    }
  }, [state.currentStep, currentScreen])

  // Calculate remaining questions
  const remainingQuestions = useMemo(() => {
    const questionScreens = QUIZ_STEPS.filter(s => s.startsWith('q'))
    const currentIdx = questionScreens.indexOf(currentScreen)
    if (currentIdx === -1) return questionScreens.length
    return questionScreens.length - currentIdx - 1
  }, [currentScreen])

  // Browser back prevention during quiz
  // On result screen: block back entirely (no return to loading/quiz)
  // On thank-you: allow back to result only
  const handleBack = useCallback(() => {
    if (currentScreen === 'result') {
      // Block: do nothing, user stays on result
      return
    }
    if (currentScreen === 'thank-you') {
      goToScreen('result')
      return
    }
    if (state.currentStep > 0) {
      prevStep()
    }
  }, [state.currentStep, currentScreen, prevStep, goToScreen])

  useBackPrevention(handleBack, state.currentStep > 0)

  return (
    <>
      <AppRouter />
      <Toaster />
      <ExitIntentModal
        show={showModal}
        remainingQuestions={remainingQuestions}
        onDismiss={() => {
          trackExitIntent(currentScreen, 'dismissed')
          dismiss()
        }}
        onContinue={() => {
          trackExitIntent(currentScreen, 'continued')
          dismiss()
        }}
      />
    </>
  )
}

function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  )
}

export default App
