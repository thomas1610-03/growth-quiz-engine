import { useCallback } from 'react'
import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { OptionCard } from '@/components/quiz/OptionCard'
import { getQuestionByScreenId } from '@/lib/questions'
import { QUIZ_CONFIG } from '@/lib/constants'
import type { ActionReadiness } from '@/types'

export function Q9Readiness() {
  const { state, setAnswer, goToScreen, prevStep } = useQuiz()
  const question = getQuestionByScreenId('q9-readiness')!
  const selected = state.answers.actionReadiness

  const handleSelect = useCallback(
    (id: string) => {
      setAnswer('actionReadiness', id as ActionReadiness)
      setTimeout(() => {
        goToScreen('email-gate')
      }, QUIZ_CONFIG.autoAdvanceDelay)
    },
    [setAnswer, goToScreen]
  )

  return (
    <QuizLayout
      title={question.question}
      microCopy={question.microCopy}
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
          large
        />
      ))}
    </QuizLayout>
  )
}
