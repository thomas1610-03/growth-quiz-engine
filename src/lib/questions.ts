import type { QuestionConfig, PrimaryConcern } from '@/types'

// =============================================
// Growth Quiz Engine Questions (9 questions, multi-axis scoring)
// Zero product mention until 70% – pure assessment
// =============================================

export const QUESTIONS: QuestionConfig[] = [
  // Q1 – Primary Concerns (Multi-Select, 6 categories)
  {
    id: 'primaryConcerns',
    screenId: 'q1-concerns',
    question: 'Which areas concern you the most?',
    microCopy: 'Select all that apply to you.',
    type: 'multi',
    autoAdvance: false,
    progress: 10,
    options: [
      {
        id: 'energy-fatigue',
        label: 'Energy & Fatigue',
        icon: 'Zap',
        emoji: '\u26A1',
      },
      {
        id: 'sleep-quality',
        label: 'Sleep Quality',
        icon: 'Moon',
        emoji: '\uD83C\uDF19',
      },
      {
        id: 'stress-mood',
        label: 'Stress & Mood',
        icon: 'Heart',
        emoji: '\uD83C\uDFAD',
      },
      {
        id: 'physical-comfort',
        label: 'Physical Comfort',
        icon: 'Activity',
        emoji: '\uD83C\uDFC3',
      },
      {
        id: 'focus-clarity',
        label: 'Focus & Clarity',
        icon: 'Brain',
        emoji: '\uD83E\uDDE0',
      },
      {
        id: 'nutrition-weight',
        label: 'Nutrition & Weight',
        icon: 'Scale',
        emoji: '\u2696\uFE0F',
      },
    ],
  },

  // Q2 – Severity Concern 1 (dynamic, 0-10 slider + frequency)
  // Rendered dynamically based on top concern from Q1
  {
    id: 'severity1Score',
    screenId: 'q2-severity-1',
    question: 'How severe is {concern1} on a scale of 0\u201310?',
    type: 'slider-frequency',
    autoAdvance: false,
    progress: 25,
  },

  // Q3 – Severity Concern 2 (conditional, only if 2+ concerns)
  {
    id: 'severity2Score',
    screenId: 'q3-severity-2',
    question: 'How severe is {concern2} on a scale of 0\u201310?',
    type: 'slider-frequency',
    autoAdvance: false,
    progress: 35,
  },

  // Q5 – Current Approach
  {
    id: 'currentApproach',
    screenId: 'q5-approach',
    question: 'What are you currently doing to address your concerns?',
    type: 'single',
    autoAdvance: true,
    progress: 45,
    options: [
      { id: 'nothing', label: 'Nothing \u2014 I don\u2019t know what helps' },
      { id: 'self-research', label: 'Self-research (supplements, apps, etc.)' },
      { id: 'professional', label: 'Professional guidance (doctor/coach)' },
      { id: 'lifestyle', label: 'Exercise & lifestyle changes' },
      { id: 'nothing-works', label: 'I\u2019ve tried many things \u2014 nothing really works' },
    ],
  },

  // Q6 – Assessment Status
  {
    id: 'assessmentStatus',
    screenId: 'q6-assessment',
    question: 'Have you had your concerns professionally assessed?',
    type: 'single',
    autoAdvance: true,
    progress: 55,
    options: [
      { id: 'confirmed', label: 'Yes, professionally assessed' },
      { id: 'suspected', label: 'I suspect issues, but haven\u2019t consulted yet' },
      { id: 'not-assessed', label: 'No, not assessed yet' },
    ],
  },

  // Q7 – Age
  {
    id: 'age',
    screenId: 'q7-age',
    question: 'What is your age range?',
    type: 'single',
    autoAdvance: true,
    progress: 60,
    options: [
      { id: 'under-25', label: 'Under 25' },
      { id: '25-34', label: '25\u201334' },
      { id: '35-44', label: '35\u201344' },
      { id: '45-54', label: '45\u201354' },
      { id: '55-64', label: '55\u201364' },
      { id: '65-plus', label: '65+' },
    ],
  },

  // Q7b – Lifecycle Phase
  {
    id: 'lifecyclePhase',
    screenId: 'q7b-lifecycle',
    question: 'How would you describe your current phase?',
    type: 'single',
    autoAdvance: true,
    progress: 65,
    options: [
      {
        id: 'transitioning',
        label: 'Going through changes',
        description: 'Transitional phase',
      },
      {
        id: 'established',
        label: 'Stable but looking to optimize',
        description: 'Optimization phase',
      },
      {
        id: 'unsure',
        label: 'Not sure where I stand',
      },
    ],
  },

  // Q8 – Main Goal
  {
    id: 'mainGoal',
    screenId: 'q8-goal',
    question: 'What would be the biggest improvement for you?',
    type: 'single',
    autoAdvance: true,
    progress: 75,
    options: [
      { id: 'more-energy', label: 'More energy throughout the day', emoji: '\u26A1' },
      { id: 'better-sleep', label: 'Better sleep quality', emoji: '\uD83D\uDE34' },
      { id: 'less-stress', label: 'Less stress and better mood', emoji: '\uD83C\uDF24\uFE0F' },
      { id: 'sharper-focus', label: 'Sharper focus and clarity', emoji: '\uD83E\uDDE0' },
    ],
  },

  // Q9 – Action Readiness
  {
    id: 'actionReadiness',
    screenId: 'q9-readiness',
    question: 'Would you like to receive a personalized action plan based on your results?',
    microCopy: 'Your plan is tailored to your specific profile and completely free.',
    type: 'single',
    autoAdvance: true,
    progress: 82,
    options: [
      {
        id: 'ready-now',
        label: 'Yes, I\u2019d like a personalized plan',
      },
      {
        id: 'interested-unsure',
        label: 'Sounds interesting, but not sure yet',
      },
      {
        id: 'tell-me-more',
        label: 'Tell me more about how it works',
      },
    ],
  },
]

// --- Concern Labels for dynamic severity screens ---

export const CONCERN_LABELS: Record<string, string> = {
  'energy-fatigue': 'Energy & Fatigue',
  'sleep-quality': 'Sleep Quality',
  'stress-mood': 'Stress & Mood',
  'physical-comfort': 'Physical Comfort',
  'focus-clarity': 'Focus & Clarity',
  'nutrition-weight': 'Nutrition & Weight',
}

export const FREQUENCY_OPTIONS = [
  { id: 'rarely', label: 'Rarely (1\u20132x per month)' },
  { id: 'several-weekly', label: 'Several times per week' },
  { id: 'daily', label: 'Daily' },
  { id: 'multiple-daily', label: 'Multiple times daily' },
] as const

/** Concern-specific frequency labels - same IDs for data consistency */
const FREQUENCY_BY_CONCERN: Record<string, ReadonlyArray<{ id: string; label: string }>> = {
  'energy-fatigue': FREQUENCY_OPTIONS,
  'sleep-quality': [
    { id: 'rarely', label: 'Rarely (1\u20132x per month)' },
    { id: 'several-weekly', label: 'Several nights per week' },
    { id: 'daily', label: 'Every night' },
    { id: 'multiple-daily', label: 'Multiple times per night' },
  ],
  'stress-mood': FREQUENCY_OPTIONS,
  'physical-comfort': [
    { id: 'rarely', label: 'Occasionally' },
    { id: 'several-weekly', label: 'Several times per week' },
    { id: 'daily', label: 'Daily' },
    { id: 'multiple-daily', label: 'Almost constantly' },
  ],
  'focus-clarity': [
    { id: 'rarely', label: 'Occasionally' },
    { id: 'several-weekly', label: 'Several times per week' },
    { id: 'daily', label: 'Daily' },
    { id: 'multiple-daily', label: 'Almost constantly' },
  ],
  'nutrition-weight': [
    { id: 'rarely', label: 'Occasionally' },
    { id: 'several-weekly', label: 'Regularly' },
    { id: 'daily', label: 'Most of the time' },
    { id: 'multiple-daily', label: 'Persistently' },
  ],
}

export function getFrequencyOptions(concernId: string): ReadonlyArray<{ id: string; label: string }> {
  return FREQUENCY_BY_CONCERN[concernId] ?? FREQUENCY_OPTIONS
}

// --- Helpers ---

export function getQuestionByScreenId(screenId: string): QuestionConfig | undefined {
  return QUESTIONS.find(q => q.screenId === screenId)
}

export function getProgressForScreen(screenId: string): number {
  const question = getQuestionByScreenId(screenId)
  if (question) return question.progress

  const specialProgress: Record<string, number> = {
    'hero': 0,
    'interstitial-1': 40,
    'interstitial-2': 70,
    'email-gate': 88,
    'loading': 100,
    'result': 100,
    'thank-you': 100,
  }
  return specialProgress[screenId] ?? 0
}

/**
 * Get the top 2 concerns from Q1 selection (in order of selection).
 * Used to dynamically generate severity screens.
 */
export function getTopConcerns(selected: PrimaryConcern[]): PrimaryConcern[] {
  return selected.slice(0, 2)
}
