import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react'
import type { QuizState, QuizAction, QuizAnswers, PrimaryConcern } from '@/types'

const QUIZ_STEPS: readonly string[] = [
  'hero',
  'q1-concerns',
  'q2-severity-1',
  'q3-severity-2',     // Conditional: only if 2+ concerns
  'interstitial-1',
  'q5-approach',
  'q6-assessment',
  'q7-age',
  'q7b-lifecycle',
  'interstitial-2',    // "Almost done" – only if >= 2 questions remain
  'q8-goal',
  'q9-readiness',
  'email-gate',
  'loading',
  'result',
  'thank-you',
] as const

export { QUIZ_STEPS }

const initialState: QuizState = {
  currentStep: 0,
  answers: {},
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }

    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.key]: action.payload.value,
        },
      }

    case 'TOGGLE_CONCERN': {
      const { key, value } = action.payload
      const current = (state.answers[key] as PrimaryConcern[]) || []
      const updated = current.includes(value as PrimaryConcern)
        ? current.filter(v => v !== value)
        : [...current, value as PrimaryConcern]
      return {
        ...state,
        answers: {
          ...state.answers,
          [key]: updated as PrimaryConcern[],
        },
      }
    }

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, QUIZ_STEPS.length - 1),
      }

    case 'PREV_STEP': {
      let prevIdx = Math.max(0, state.currentStep - 1)
      // Skip q3-severity-2 when going back if only 1 concern selected
      const q3Idx = QUIZ_STEPS.indexOf('q3-severity-2')
      if (prevIdx === q3Idx && (state.answers.primaryConcerns?.length ?? 0) < 2) {
        prevIdx = Math.max(0, prevIdx - 1)
      }
      return {
        ...state,
        currentStep: prevIdx,
      }
    }

    case 'RESET_QUIZ':
      return initialState

    default:
      return state
  }
}

interface QuizContextType {
  state: QuizState
  currentScreen: string
  dispatch: React.Dispatch<QuizAction>
  setAnswer: (key: keyof QuizAnswers, value: unknown) => void
  toggleConcern: (key: 'primaryConcerns', value: string) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  goToScreen: (screenId: string) => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  const currentScreen = QUIZ_STEPS[state.currentStep] ?? 'hero'

  const setAnswer = useCallback((key: keyof QuizAnswers, value: unknown) => {
    dispatch({ type: 'SET_ANSWER', payload: { key, value } })
  }, [])

  const toggleConcern = useCallback(
    (key: 'primaryConcerns', value: string) => {
      dispatch({ type: 'TOGGLE_CONCERN', payload: { key, value } })
    },
    []
  )

  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), [])
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), [])

  const goToStep = useCallback(
    (step: number) => dispatch({ type: 'SET_STEP', payload: step }),
    []
  )

  const goToScreen = useCallback((screenId: string) => {
    const index = QUIZ_STEPS.indexOf(screenId)
    if (index !== -1) {
      dispatch({ type: 'SET_STEP', payload: index })
    }
  }, [])

  return (
    <QuizContext.Provider
      value={{
        state,
        currentScreen,
        dispatch,
        setAnswer,
        toggleConcern,
        nextStep,
        prevStep,
        goToStep,
        goToScreen,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
