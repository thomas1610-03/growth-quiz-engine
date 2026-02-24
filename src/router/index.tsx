import { AnimatePresence } from 'framer-motion'
import { useQuiz } from '@/context/QuizContext'

import { HeroLanding } from '@/pages/HeroLanding'
import { Q1Concerns } from '@/pages/Q1Symptoms'
import { Q2Severity1 } from '@/pages/Q2Severity1'
import { Q3Severity2 } from '@/pages/Q3Severity2'
import { Interstitial1 } from '@/pages/Interstitial1'
import { Q5Approach } from '@/pages/Q5Bewaeltigung'
import { Q6Assessment } from '@/pages/Q6Diagnose'
import { Q7Age } from '@/pages/Q7Alter'
import { Q7bLifecycle } from '@/pages/Q7bZyklus'
import { Interstitial2 } from '@/pages/Interstitial2'
import { Q8Goal } from '@/pages/Q8Hauptziel'
import { Q9Readiness } from '@/pages/Q9Rezept'
import { EmailGatePage } from '@/pages/EmailGatePage'
import { LoadingScreen } from '@/pages/LoadingScreen'
import { ResultScreen } from '@/pages/ResultScreen'
import { ThankYouPage } from '@/pages/ThankYouPage'

export function AppRouter() {
  const { currentScreen } = useQuiz()

  const renderPage = () => {
    switch (currentScreen) {
      case 'hero':
        return <HeroLanding />
      case 'q1-concerns':
        return <Q1Concerns />
      case 'q2-severity-1':
        return <Q2Severity1 />
      case 'q3-severity-2':
        return <Q3Severity2 />
      case 'interstitial-1':
        return <Interstitial1 />
      case 'q5-approach':
        return <Q5Approach />
      case 'q6-assessment':
        return <Q6Assessment />
      case 'q7-age':
        return <Q7Age />
      case 'q7b-lifecycle':
        return <Q7bLifecycle />
      case 'interstitial-2':
        return <Interstitial2 />
      case 'q8-goal':
        return <Q8Goal />
      case 'q9-readiness':
        return <Q9Readiness />
      case 'email-gate':
        return <EmailGatePage />
      case 'loading':
        return <LoadingScreen />
      case 'result':
        return <ResultScreen />
      case 'thank-you':
        return <ThankYouPage />
      default:
        return <HeroLanding />
    }
  }

  return (
    <AnimatePresence mode="wait">
      {renderPage()}
    </AnimatePresence>
  )
}
