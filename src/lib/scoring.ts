import type {
  QuizAnswers,
  AgeGroup,
  LifecyclePhase,
  AssessmentStatus,
  ActionReadiness,
  CurrentApproach,
  Phase,
  Severity,
  ImpactIndex,
  ReadinessLevel,
  ResultType,
  QuizResult,
  PrimaryConcern,
  ConcernFrequency,
} from '@/types'

// =============================================
// Growth Quiz Engine Scoring (Multi-Axis Assessment, 0-44)
// 1. Phase (early / mid / advanced)
// 2. Severity (none / mild / moderate / significant / severe)
// 3. Impact Index (low / medium / high)
// 4. Readiness Level (high / medium / low)
// =============================================

// --- Phase Score ---
const AGE_PHASE_SCORES: Record<AgeGroup, number> = {
  'under-25': 0,
  '25-34': 1,
  '35-44': 2,
  '45-54': 3,
  '55-64': 4,
  '65-plus': 5,
}

const LIFECYCLE_PHASE_SCORES: Record<LifecyclePhase, number> = {
  'transitioning': 2,
  'established': 5,
  'unsure': 3,
}

export function calculatePhaseScore(answers: QuizAnswers): number {
  const ageScore = AGE_PHASE_SCORES[answers.age ?? 'under-25']
  const lifecycleScore = LIFECYCLE_PHASE_SCORES[answers.lifecyclePhase ?? 'unsure']
  return ageScore + lifecycleScore
}

export function getPhase(phaseScore: number): Phase {
  if (phaseScore <= 4) return 'early'
  if (phaseScore <= 7) return 'mid'
  return 'advanced'
}

// --- Frequency Weights for multi-axis scoring ---
const FREQUENCY_WEIGHTS: Record<ConcernFrequency, number> = {
  'rarely': 0.7,
  'several-weekly': 1.0,
  'daily': 1.3,
  'multiple-daily': 1.5,
}

// --- Total Score (Multi-Axis Assessment, 0-44) ---
export function calculateTotalScore(answers: QuizAnswers): number {
  const concerns = answers.primaryConcerns ?? []
  if (concerns.length === 0) return 0

  let score = 0

  // Top concern (with slider + frequency data)
  const s1 = answers.severity1Score ?? 0
  const f1 = FREQUENCY_WEIGHTS[answers.severity1Frequency ?? 'rarely']
  score += s1 * f1

  // Second concern (with slider + frequency data)
  if (concerns.length >= 2) {
    const s2 = answers.severity2Score ?? 0
    const f2 = FREQUENCY_WEIGHTS[answers.severity2Frequency ?? 'rarely']
    score += s2 * f2
  }

  // Remaining concerns (selected but not individually rated)
  // Estimate based on average of rated concerns
  const remainingCount = Math.max(0, concerns.length - 2)
  if (remainingCount > 0) {
    const avgRated = concerns.length >= 2
      ? (s1 + (answers.severity2Score ?? 0)) / 2
      : s1
    score += remainingCount * avgRated * 0.6
  }

  return Math.min(44, Math.round(score))
}

// --- Severity (based on total score 0-44) ---
export function calculateSeverityScore(answers: QuizAnswers): number {
  return calculateTotalScore(answers)
}

export function getSeverity(severityScore: number): Severity {
  if (severityScore === 0) return 'none'
  if (severityScore <= 10) return 'mild'
  if (severityScore <= 22) return 'moderate'
  if (severityScore <= 33) return 'significant'
  return 'severe'
}

// --- Impact Index (raw average of severity sliders, 0-10) ---
export function calculateImpactScore(answers: QuizAnswers): number {
  const s1 = answers.severity1Score ?? 0
  const s2 = answers.severity2Score ?? undefined
  if (s2 !== undefined) {
    return (s1 + s2) / 2
  }
  return s1
}

export function getImpactIndex(impactScore: number): ImpactIndex {
  if (impactScore <= 3) return 'low'
  if (impactScore <= 6) return 'medium'
  return 'high'
}

// --- Readiness Score ---
const ASSESSMENT_READINESS: Record<AssessmentStatus, number> = {
  'confirmed': 4,
  'suspected': 2,
  'not-assessed': 0,
}

const ACTION_READINESS: Record<ActionReadiness, number> = {
  'ready-now': 5,
  'interested-unsure': 2,
  'tell-me-more': 1,
}

const APPROACH_READINESS: Record<CurrentApproach, number> = {
  'nothing': 1,
  'self-research': 2,
  'lifestyle': 2,
  'professional': 4,
  'nothing-works': 3,
}

export function calculateReadinessScore(answers: QuizAnswers): number {
  const assessment = ASSESSMENT_READINESS[answers.assessmentStatus ?? 'not-assessed']
  const action = ACTION_READINESS[answers.actionReadiness ?? 'tell-me-more']
  const approach = APPROACH_READINESS[answers.currentApproach ?? 'nothing']
  return assessment + action + approach
}

export function getReadinessLevel(score: number): ReadinessLevel {
  if (score >= 9) return 'high'
  if (score >= 5) return 'medium'
  return 'low'
}

// --- Result Type Routing ---
export function getResultType(severity: Severity): ResultType {
  if (severity === 'none') return 'no-concerns'
  if (severity === 'mild') return 'mild-concerns'
  if (severity === 'moderate') return 'moderate-concerns'
  if (severity === 'significant') return 'significant-concerns'
  return 'severe-concerns'
}

// --- Recommended Action Modules based on concerns ---
export function getRecommendedModules(answers: QuizAnswers): string[] {
  const concerns = answers.primaryConcerns ?? []
  const modules: string[] = []

  if (concerns.includes('energy-fatigue')) {
    modules.push('Module 1\u20133: Energy Boost')
  }
  if (concerns.includes('sleep-quality')) {
    modules.push('Module 7\u20139: Sleep Optimization')
  }
  if (concerns.includes('stress-mood')) {
    modules.push('Module 4\u20136: Emotional Balance')
  }
  if (concerns.includes('physical-comfort')) {
    modules.push('Module 10\u201312: Movement & Recovery')
  }
  if (concerns.includes('nutrition-weight')) {
    modules.push('Module 13\u201314: Nutrition & Digestion')
  }
  if (concerns.includes('focus-clarity')) {
    modules.push('Module 15\u201316: Focus & Mental Clarity')
  }

  // Always include SOS plan for severe concerns
  const totalScore = calculateTotalScore(answers)
  if (totalScore >= 23) {
    modules.push('SOS Plan: Quick Relief Strategies')
  }

  return modules
}

// --- Full Scoring ---
export function calculateResult(answers: QuizAnswers): QuizResult {
  const phaseScore = calculatePhaseScore(answers)
  const severityScore = calculateSeverityScore(answers)
  const impactScore = calculateImpactScore(answers)
  const totalScore = calculateTotalScore(answers)
  const readinessScore = calculateReadinessScore(answers)

  const phase = getPhase(phaseScore)
  const severity = getSeverity(severityScore)
  const impactIndex = getImpactIndex(impactScore)
  const readinessLevel = getReadinessLevel(readinessScore)
  const resultType = getResultType(severity)
  const topConcerns = (answers.primaryConcerns ?? []).slice(0, 2) as PrimaryConcern[]
  const recommendedModules = getRecommendedModules(answers)

  return {
    phase,
    severity,
    impactIndex,
    readinessLevel,
    resultType,
    phaseScore,
    severityScore,
    impactScore,
    totalScore,
    readinessScore,
    topConcerns,
    recommendedModules,
  }
}
