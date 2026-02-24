import { useEffect } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { SliderQuestion } from '@/components/quiz/SliderQuestion'
import { OptionCard } from '@/components/quiz/OptionCard'
import { CONCERN_LABELS, getFrequencyOptions } from '@/lib/questions'
import type { ConcernFrequency } from '@/types'

export function Q2Severity1() {
  const { state, setAnswer, goToScreen, prevStep } = useQuiz()

  const topConcern = state.answers.primaryConcerns?.[0]
  const concernLabel = topConcern ? CONCERN_LABELS[topConcern] : 'your primary concern'
  const value = state.answers.severity1Score ?? 5
  const frequency = state.answers.severity1Frequency

  // Save default slider value on mount so scoring never sees undefined
  useEffect(() => {
    if (state.answers.severity1Score === undefined) {
      setAnswer('severity1Score', 5)
    }
  }, [state.answers.severity1Score, setAnswer])

  const handleContinue = () => {
    // If 2+ concerns, go to severity-2. Otherwise skip to interstitial.
    if ((state.answers.primaryConcerns?.length ?? 0) >= 2) {
      goToScreen('q3-severity-2')
    } else {
      goToScreen('interstitial-1')
    }
  }

  return (
    <QuizLayout
      title={`How much does this affect you: ${concernLabel}?`}
      microCopy="Move the slider and select the frequency."
      onBack={prevStep}
      progressValue={25}
      onContinue={handleContinue}
      continueDisabled={!frequency}
    >
      <SliderQuestion
        value={value}
        onChange={(v) => setAnswer('severity1Score', v)}
        min={0}
        max={10}
        labelLeft="0 \u2013 Barely noticeable"
        labelRight="10 \u2013 Unbearable"
      />

      <div className="mt-6">
        <p className="text-[15px] font-medium text-[#2C3E50] mb-3">
          How often does this occur?
        </p>
        {getFrequencyOptions(topConcern ?? '').map((opt) => (
          <OptionCard
            key={opt.id}
            id={opt.id}
            label={opt.label}
            selected={frequency === opt.id}
            onSelect={() => setAnswer('severity1Frequency', opt.id as ConcernFrequency)}
          />
        ))}
      </div>
    </QuizLayout>
  )
}
