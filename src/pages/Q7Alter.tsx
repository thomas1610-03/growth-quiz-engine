import { useCallback } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { OptionCard } from '@/components/quiz/OptionCard'
import { getQuestionByScreenId } from '@/lib/questions'
import { QUIZ_CONFIG } from '@/lib/constants'
import type { AgeGroup } from '@/types'

export function Q7Age() {
  const { state, setAnswer, goToScreen, prevStep } = useQuiz()
  const question = getQuestionByScreenId('q7-age')!
  const selected = state.answers.age

  const handleSelect = useCallback(
    (id: string) => {
      setAnswer('age', id as AgeGroup)
      setTimeout(() => {
        goToScreen('q7b-lifecycle')
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
