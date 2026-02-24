import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuiz } from '@/context/QuizContext'
import { sendEmailWebhook } from '@/lib/webhook'
import { calculateResult } from '@/lib/scoring'
import { BRAND } from '@/lib/constants'

const STEPS = [
  'Analyzing your wellness profile...',
  'Matching with assessment data...',
  'Creating your personalized action plan...',
]

const STEP_DURATION = 2500

export function LoadingScreen() {
  const { state, goToScreen } = useQuiz()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const webhookFired = useRef(false)

  // Fire webhook here – all answers are complete
  useEffect(() => {
    if (webhookFired.current) return
    webhookFired.current = true

    const email = state.answers.email
    const consent = state.answers.emailConsent ?? false
    if (email) {
      const result = calculateResult(state.answers)
      sendEmailWebhook(email, consent, state.answers, result)
    }
  }, [state.answers])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, i])
          if (i < STEPS.length - 1) {
            setCurrentStep(i + 1)
          }
        }, STEP_DURATION * (i + 1))
      )
    })

    // Auto-navigate 0.5s after last step completes
    timers.push(
      setTimeout(() => goToScreen('result'), STEP_DURATION * STEPS.length + 500)
    )

    return () => timers.forEach(clearTimeout)
  }, [goToScreen])

  const progressPercent = Math.min(100, ((completedSteps.length) / STEPS.length) * 100)

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F8F1F9] flex flex-col"
    >
      {/* Progress bar at top */}
      <div className="w-full h-1 bg-[#E2D6EA]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="flex-1 max-w-[480px] w-full mx-auto px-5 flex flex-col items-center justify-center py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <img
            src={BRAND.appIconPath}
            alt="App"
            className="w-12 h-12 rounded-xl"
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[24px] leading-[30px] font-bold text-[#2C3E50] mb-10 text-center"
        >
          Your action plan is being created...
        </motion.h2>

        {/* Steps */}
        <div className="w-full max-w-sm space-y-5">
          {STEPS.map((step, i) => {
            const isComplete = completedSteps.includes(i)
            const isActive = currentStep === i && !isComplete

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="flex items-center gap-3.5"
              >
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isComplete ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-7 h-7 rounded-full bg-[#4ECDC4] flex items-center justify-center"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <motion.polyline
                            points="20 6 9 17 4 12"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                          />
                        </svg>
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        key="spinner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-2 border-[#4ECDC4]/30 border-t-[#4ECDC4] rounded-full animate-spin"
                        style={{ width: 22, height: 22 }}
                      />
                    ) : (
                      <motion.div
                        key="empty"
                        className="rounded-full border-2 border-[#E2D6EA]"
                        style={{ width: 22, height: 22 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <span
                  className={`text-[15px] transition-colors duration-300 ${
                    isComplete
                      ? 'text-[#2C3E50] font-medium'
                      : isActive
                        ? 'text-[#4F5D75]'
                        : 'text-[#9CA3AF]'
                  }`}
                >
                  {step}
                </span>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-[13px] text-[#9CA3AF]"
        >
          Based on validated assessment data
        </motion.p>
      </div>
    </motion.div>
  )
}
