import { useQuiz } from '@/context/QuizContext'
import { QuizLayout } from '@/components/layout/QuizLayout'
import { MultiSelectGrid } from '@/components/quiz/MultiSelectGrid'
import { StickyQuestionHeader } from '@/components/quiz/StickyQuestionHeader'
import { getQuestionByScreenId } from '@/lib/questions'

export function Q1Concerns() {
  const { state, toggleConcern, goToScreen, prevStep } = useQuiz()
  const question = getQuestionByScreenId('q1-concerns')!
  const selected = state.answers.primaryConcerns ?? []

  const handleContinue = () => {
    // Always go to severity-1 (for first selected concern)
    goToScreen('q2-severity-1')
  }

  return (
    <QuizLayout
      title={question.question}
      microCopy={question.microCopy}
      onBack={prevStep}
      progressValue={question.progress}
      onContinue={handleContinue}
      continueDisabled={selected.length === 0}
    >
      <StickyQuestionHeader question={question.question}>
        <MultiSelectGrid
          options={question.options!}
          selected={selected}
          onToggle={(id) => toggleConcern('primaryConcerns', id)}
        />
      </StickyQuestionHeader>
    </QuizLayout>
  )
}
