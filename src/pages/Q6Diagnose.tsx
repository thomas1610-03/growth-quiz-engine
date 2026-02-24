import { useCallback } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { OptionCard } from '@/components/quiz/OptionCard'
import { getQuestionByScreenId } from '@/lib/questions'
import { QUIZ_CONFIG } from '@/lib/constants'
import type { AssessmentStatus } from '@/types'

export function Q6Assessment() {
  const { state, setAnswer, goToScreen, prevStep } = useQuiz()
  const question = getQuestionByScreenId('q6-assessment')!
  const selected = state.answers.assessmentStatus

  const handleSelect = useCallback(
    (id: string) => {
      setAnswer('assessmentStatus', id as AssessmentStatus)
      setTimeout(() => {
        goToScreen('q7-age')
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
