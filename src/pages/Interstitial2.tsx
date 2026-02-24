import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Interstitial } from '@/components/quiz/Interstitial'
import { useQuiz } from '@/context/QuizContext'
import { QUIZ_STEPS } from '@/context/QuizContext'

/** Count quiz questions remaining after interstitial-2 (before email-gate) */
function countRemainingQuestions(): number {
  const interIdx = QUIZ_STEPS.indexOf('interstitial-2')
  const emailIdx = QUIZ_STEPS.indexOf('email-gate')
  if (interIdx === -1 || emailIdx === -1) return 0

  let count = 0
  for (let i = interIdx + 1; i < emailIdx; i++) {
    const s = QUIZ_STEPS[i]
    if (s.startsWith('q')) count++
  }
  return count
}

export function Interstitial2() {
  const { goToScreen } = useQuiz()
  const remaining = useMemo(countRemainingQuestions, [])

  return (
    <Interstitial
      desktopImage="/images/interstitial-desktop.png"
      mobileImage="/images/interstitial-mobile.png"
      onContinue={() => goToScreen('q8-goal')}
    >
      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-[28px] md:text-[42px] font-bold text-white leading-[1.2]"
      >
        Almost done.
      </motion.h2>

      {/* Subtext – dynamic remaining count */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-[15px] md:text-[18px] leading-[1.6] mt-3 md:mt-4"
        style={{ color: 'rgba(255,255,255,0.85)' }}
      >
        Just {remaining} more questions &mdash; then you'll receive your
        <br className="hidden md:inline" />{' '}
        personalized plan with specific recommendations
        <br className="hidden md:inline" />{' '}
        for your concerns.
      </motion.p>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-[14px] md:text-[16px] italic mt-4 md:mt-5"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        Your plan is being prepared.
      </motion.p>
    </Interstitial>
  )
}
