import { useCallback } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { OptionCard } from '@/components/quiz/OptionCard'
import { getQuestionByScreenId } from '@/lib/questions'
import { QUIZ_CONFIG } from '@/lib/constants'
import type { MainGoal } from '@/types'

export function Q8Goal() {
  const { state, setAnswer, goToScreen, prevStep } = useQuiz()
  const question = getQuestionByScreenId('q8-goal')!
  const selected = state.answers.mainGoal

  const handleSelect = useCallback(
    (id: string) => {
      setAnswer('mainGoal', id as MainGoal)
      setTimeout(() => {
        goToScreen('q9-readiness')
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
          emoji={option.emoji}
          selected={selected === option.id}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </QuizLayout>
  )
}
