import { useEffect } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { SliderQuestion } from '@/components/quiz/SliderQuestion'
import { OptionCard } from '@/components/quiz/OptionCard'
import { CONCERN_LABELS, getFrequencyOptions } from '@/lib/questions'
import type { ConcernFrequency } from '@/types'

export function Q3Severity2() {
  const { state, setAnswer, goToScreen, prevStep } = useQuiz()

  const topConcern = state.answers.primaryConcerns?.[1]
  const concernLabel = topConcern ? CONCERN_LABELS[topConcern] : 'your second concern'
  const value = state.answers.severity2Score ?? 5
  const frequency = state.answers.severity2Frequency

  // Save default slider value on mount so scoring never sees undefined
  useEffect(() => {
    if (state.answers.severity2Score === undefined) {
      setAnswer('severity2Score', 5)
    }
  }, [state.answers.severity2Score, setAnswer])

  return (
    <QuizLayout
      title={`How much does this affect you: ${concernLabel}?`}
      microCopy="Move the slider and select the frequency."
      onBack={prevStep}
      progressValue={35}
      onContinue={() => goToScreen('interstitial-1')}
      continueDisabled={!frequency}
    >
      <SliderQuestion
        value={value}
        onChange={(v) => setAnswer('severity2Score', v)}
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
            onSelect={() => setAnswer('severity2Frequency', opt.id as ConcernFrequency)}
          />
        ))}
      </div>
    </QuizLayout>
  )
}
