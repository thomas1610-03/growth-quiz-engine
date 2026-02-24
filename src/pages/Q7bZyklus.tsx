import { useCallback } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { OptionCard } from '@/components/quiz/OptionCard'
import { getQuestionByScreenId } from '@/lib/questions'
import { QUIZ_CONFIG } from '@/lib/constants'
import type { LifecyclePhase } from '@/types'

export function Q7bLifecycle() {
  const { state, setAnswer, goToScreen, prevStep } = useQuiz()
  const question = getQuestionByScreenId('q7b-lifecycle')!
  const selected = state.answers.lifecyclePhase

  const handleSelect = useCallback(
    (id: string) => {
      setAnswer('lifecyclePhase', id as LifecyclePhase)
      setTimeout(() => {
        goToScreen('interstitial-2')
      }, QUIZ_CONFIG.autoAdvanceDelay)
    },
    [setAnswer, goToScreen]
  )

  return (
    <QuizLayout
      title={question.question}
      onBack={prevStep}
      progressValue={question.progress}
    >
      {question.options!.map((option) => (
        <OptionCard
          key={option.id}
          id={option.id}
          label={option.label}
          description={option.description}
          selected={selected === option.id}
          onSelect={() => handleSelect(option.id)}
          large
        />
      ))}
    </QuizLayout>
  )
}
