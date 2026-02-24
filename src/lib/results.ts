import type { ResultType, ResultTypeConfig, Phase, Severity, ImpactIndex, ReadinessLevel } from '@/types'

// =============================================
// Growth Quiz Engine Result Types
// 5 severity brackets based on Multi-Axis Assessment Score (0-44)
// =============================================

export const RESULT_TYPES: Record<ResultType, ResultTypeConfig> = {
  'no-concerns': {
    id: 'no-concerns',
    headline: 'No Notable Concerns',
    subtitle: 'Your profile shows no significant concerns right now. Great that you\'re staying informed.',
    description:
      'Your assessment profile shows no notable wellness concerns at this time. That can change \u2014 keep an eye on your well-being and retake the assessment in a few months.',
    actionModules: [],
    nextStepInfo: 'No immediate action needed. If concerns develop, you can always get a personalized action plan at that time.',
  },

  'mild-concerns': {
    id: 'mild-concerns',
    headline: 'Mild Concerns Detected',
    subtitle: 'Your body is sending early signals \u2014 and you\'re paying attention. This is the right time to act.',
    description:
      'Your profile shows mild but noticeable changes. Early action can prevent concerns from escalating. A structured plan helps you stay in control.',
    actionModules: [
      {
        moduleRange: 'Module 1\u20133',
        title: 'Foundations & Prevention',
        description: 'Understand what\'s happening and learn evidence-based strategies for daily life.',
        icon: '\uD83D\uDCDA',
      },
      {
        moduleRange: 'Module 4\u20136',
        title: 'Personalized Exercises',
        description: 'Short daily programs tailored to your specific concern combination.',
        icon: '\uD83E\uDDD8',
      },
    ],
    nextStepInfo: 'Get your personalized action plan to manage concerns early \u2014 completely free.',
  },

  'moderate-concerns': {
    id: 'moderate-concerns',
    headline: 'Moderate Concerns',
    subtitle: 'You\'re carrying more than most see. There\'s a plan that can help.',
    description:
      'Your profile shows noticeable impact on your daily life. The good news: this is exactly the stage where evidence-based interventions are most effective.',
    actionModules: [
      {
        moduleRange: 'Module 1\u20133',
        title: 'Targeted Management',
        description: 'Focused strategies for your strongest concerns \u2014 based on your profile.',
        icon: '\uD83C\uDFAF',
      },
      {
        moduleRange: 'Module 7\u20139',
        title: 'Sleep & Recovery',
        description: '7-night program: temperature, timing, breathing techniques \u2014 tailored to your needs.',
        icon: '\uD83C\uDF19',
      },
      {
        moduleRange: 'SOS Plan',
        title: 'Quick Relief',
        description: 'Immediate strategies for acute episodes of discomfort, sleep issues, or mood dips.',
        icon: '\u26A1',
      },
    ],
    nextStepInfo: 'Your personalized plan is ready \u2014 get your detailed action steps and start improving today.',
  },

  'significant-concerns': {
    id: 'significant-concerns',
    headline: 'Significant Concerns',
    subtitle: 'Your concerns are having a real impact. You deserve targeted support \u2014 and you can get it now.',
    description:
      'Your profile shows considerable impact on your daily life. This affects many people \u2014 and effective, evidence-based help exists. We also recommend professional guidance.',
    actionModules: [
      {
        moduleRange: 'Module 1\u20133',
        title: 'Intensive Energy Program',
        description: 'Cognitive behavioral techniques proven to reduce fatigue and boost energy by 40-60%.',
        icon: '\uD83D\uDD25',
      },
      {
        moduleRange: 'Module 7\u20139',
        title: 'Sleep Intensive',
        description: 'CBT-I adapted for your profile. Measurable sleep improvement in 2-3 weeks.',
        icon: '\uD83C\uDF19',
      },
      {
        moduleRange: 'Module 10\u201312',
        title: 'Emotional Balance',
        description: 'Mindfulness + cognitive techniques specifically designed for stress-related mood challenges.',
        icon: '\uD83E\uDDE0',
      },
      {
        moduleRange: 'SOS Plan',
        title: 'Immediate Support',
        description: '2-minute interventions for acute episodes of discomfort, anxiety, or sleeplessness.',
        icon: '\uD83C\uDD98',
      },
    ],
    nextStepInfo: 'At your level of impact, a structured plan is especially important. Get your personalized action plan now \u2014 we also recommend consulting a professional.',
  },

  'severe-concerns': {
    id: 'severe-concerns',
    headline: 'Severe Concerns',
    subtitle: 'You\'re going through an extremely challenging phase. You\'re not alone \u2014 and concrete help exists.',
    description:
      'Your profile indicates serious impact on your well-being. This is not a sign of weakness \u2014 many people experience similar challenges. Evidence-based support can significantly improve your quality of life. Please seek professional guidance soon.',
    actionModules: [
      {
        moduleRange: 'Module 1\u20133',
        title: 'Intensive Energy Program',
        description: 'Cognitive behavioral techniques proven to reduce fatigue and boost energy by 40-60%.',
        icon: '\uD83D\uDD25',
      },
      {
        moduleRange: 'Module 7\u20139',
        title: 'Sleep Intensive',
        description: 'CBT-I adapted for your profile. Measurable sleep improvement in 2-3 weeks.',
        icon: '\uD83C\uDF19',
      },
      {
        moduleRange: 'Module 10\u201312',
        title: 'Emotional Balance',
        description: 'Mindfulness + cognitive techniques specifically designed for stress-related mood challenges.',
        icon: '\uD83E\uDDE0',
      },
      {
        moduleRange: 'SOS Plan',
        title: 'Immediate Support',
        description: '2-minute interventions for acute episodes of discomfort, anxiety, or sleeplessness.',
        icon: '\uD83C\uDD98',
      },
    ],
    nextStepInfo: 'At your level of impact, professional support is strongly recommended. Get your personalized action plan now and please schedule a consultation with a professional soon.',
  },
}

// --- Phase Labels ---
export const PHASE_LABELS: Record<Phase, string> = {
  early: 'Early Phase',
  mid: 'Mid Phase',
  advanced: 'Advanced Phase',
}

// --- Severity Labels ---
export const SEVERITY_LABELS: Record<Severity, string> = {
  none: 'No Concerns',
  mild: 'Mild Concerns',
  moderate: 'Moderate Concerns',
  significant: 'Significant Concerns',
  severe: 'Severe Concerns',
}

// --- Impact Index Labels ---
export const IMPACT_INDEX_LABELS: Record<ImpactIndex, string> = {
  low: 'Low Impact',
  medium: 'Medium Impact',
  high: 'High Impact',
}

// --- Readiness Labels ---
export const READINESS_LABELS: Record<ReadinessLevel, string> = {
  high: 'High Readiness',
  medium: 'Medium Readiness',
  low: 'Not Yet Ready',
}

export function getResultConfig(resultType: ResultType): ResultTypeConfig {
  return RESULT_TYPES[resultType]
}
