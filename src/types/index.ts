// =============================================
// Growth Quiz Engine Types (Product Fit Assessment)
// =============================================

// --- Q1: Primary Concerns (6 categories, multi-select) ---

export type PrimaryConcern =
  | 'energy-fatigue'
  | 'sleep-quality'
  | 'stress-mood'
  | 'physical-comfort'
  | 'focus-clarity'
  | 'nutrition-weight'

// --- Q2-Q4: Severity per top concerns ---

export type ConcernFrequency =
  | 'rarely'
  | 'several-weekly'
  | 'daily'
  | 'multiple-daily'

// --- Q5: Current Approach ---

export type CurrentApproach =
  | 'nothing'
  | 'self-research'
  | 'professional'
  | 'lifestyle'
  | 'nothing-works'

// --- Q6: Assessment Status ---

export type AssessmentStatus =
  | 'confirmed'
  | 'suspected'
  | 'not-assessed'

// --- Q7: Age ---

export type AgeGroup =
  | 'under-25'
  | '25-34'
  | '35-44'
  | '45-54'
  | '55-64'
  | '65-plus'

// --- Q7b: Lifecycle Phase ---

export type LifecyclePhase =
  | 'transitioning'
  | 'established'
  | 'unsure'

// --- Q8: Main Goal ---

export type MainGoal =
  | 'more-energy'
  | 'better-sleep'
  | 'less-stress'
  | 'sharper-focus'

// --- Q9: Action Readiness ---

export type ActionReadiness =
  | 'ready-now'
  | 'interested-unsure'
  | 'tell-me-more'

// --- Quiz State ---

export interface QuizAnswers {
  // Q1: Primary concerns
  primaryConcerns?: PrimaryConcern[]
  // Q2-Q4: Dynamic severity (for top 2 selected concerns)
  severity1Score?: number      // 0-10
  severity1Frequency?: ConcernFrequency
  severity2Score?: number      // 0-10
  severity2Frequency?: ConcernFrequency
  // Q5: Current approach
  currentApproach?: CurrentApproach
  // Q6: Assessment status
  assessmentStatus?: AssessmentStatus
  // Q7: Age
  age?: AgeGroup
  // Q7b: Lifecycle phase
  lifecyclePhase?: LifecyclePhase
  // Q8: Main goal
  mainGoal?: MainGoal
  // Q9: Action readiness
  actionReadiness?: ActionReadiness
  // Email Gate (extended)
  firstName?: string
  email?: string
  emailConsent?: boolean
  phone?: string
  postalCode?: string
}

export interface QuizState {
  currentStep: number
  answers: QuizAnswers
}

export type QuizAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_ANSWER'; payload: { key: keyof QuizAnswers; value: unknown } }
  | { type: 'TOGGLE_CONCERN'; payload: { key: 'primaryConcerns'; value: string } }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET_QUIZ' }

// --- Quiz Flow ---

export type ScreenId =
  | 'hero'
  | 'q1-concerns'
  | 'q2-severity-1'
  | 'q3-severity-2'
  | 'interstitial-1'
  | 'q5-approach'
  | 'q6-assessment'
  | 'q7-age'
  | 'q7b-lifecycle'
  | 'interstitial-2'
  | 'q8-goal'
  | 'q9-readiness'
  | 'email-gate'
  | 'loading'
  | 'result'
  | 'thank-you'

// --- Scoring ---

export type Phase = 'early' | 'mid' | 'advanced'
export type Severity = 'none' | 'mild' | 'moderate' | 'significant' | 'severe'
export type ImpactIndex = 'low' | 'medium' | 'high'
export type ReadinessLevel = 'high' | 'medium' | 'low'

export type ResultType =
  | 'no-concerns'
  | 'mild-concerns'
  | 'moderate-concerns'
  | 'significant-concerns'
  | 'severe-concerns'

export interface QuizResult {
  phase: Phase
  severity: Severity
  impactIndex: ImpactIndex
  readinessLevel: ReadinessLevel
  resultType: ResultType
  phaseScore: number
  severityScore: number
  impactScore: number           // raw 0-10 average from severity sliders
  totalScore: number            // Multi-Axis Assessment Score 0-44
  readinessScore: number        // numeric score
  topConcerns: PrimaryConcern[]
  recommendedModules: string[]  // action module references
}

// --- A/B Test ---

export type ABVariant = 'a' | 'b'

// --- UI Component Types ---

export interface QuestionOption {
  id: string
  label: string
  description?: string
  emoji?: string
  icon?: string  // Lucide icon name for concern cards
}

export interface QuestionConfig {
  id: string
  screenId: ScreenId
  question: string
  microCopy?: string
  type: 'single' | 'multi' | 'slider' | 'slider-frequency' | 'email' | 'info'
  options?: QuestionOption[]
  autoAdvance?: boolean
  progress: number
}

export interface ResultTypeConfig {
  id: ResultType
  headline: string
  subtitle: string
  description: string
  actionModules: ActionModule[]
  nextStepInfo: string
}

export interface ActionModule {
  moduleRange: string   // e.g. "Module 1-3"
  title: string
  description: string
  icon: string
}

export interface Recommendation {
  icon: string
  title: string
  description: string
}
