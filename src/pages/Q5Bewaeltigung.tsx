import { useCallback } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { OptionCard } from '@/components/quiz/OptionCard'
import { getQuestionByScreenId } from '@/lib/questions'
import { QUIZ_CONFIG } from '@/lib/constants'
import type { CurrentApproach } from '@/types'

export function Q5Approach() {
  const { state, setAnswer, goToScreen, prevStep } = useQuiz()
  const question = getQuestionByScreenId('q5-approach')!
  const selected = state.answers.currentApproach

  const handleSelect = useCallback(
    (id: string) => {
      setAnswer('currentApproach', id as CurrentApproach)
      setTimeout(() => {
        goToScreen('q6-assessment')
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
          selected={selected === option.id}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </QuizLayout>
  )
}
