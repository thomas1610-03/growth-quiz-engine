// Growth Quiz Engine - Configuration Constants
// Question data lives in lib/questions.ts
// Result data lives in lib/results.ts
// Scoring logic lives in lib/scoring.ts

export const QUIZ_CONFIG = {
  autoAdvanceDelay: 400,
  interstitialButtonDelay: 2000,
  loadingStepDuration: 2500,
  loadingTotalDuration: 9500,
  validationToastDuration: 1500,
} as const

export const BRAND = {
  name: 'QuizFlow',
  company: 'Your Company',
  tagline: 'Find your perfect product fit in minutes.',
  userCount: '2,000+ participants',
  logoPath: '/images/logo.svg',
  logoFallback: '/images/logo.png',
  appIconPath: '/images/app-icon.png',
  appStoreUrl: 'https://apps.apple.com/app/your-app',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=your.app',
} as const

// A/B Test Titles (Landing Page)
export const AB_TITLES = {
  a: 'Discover your ideal wellness plan in just 3 minutes',
  b: 'Find out how your wellness scores really stack up in 3 minutes',
} as const

export const AB_SUBTITLES = {
  a: 'Science-backed 3-minute assessment based on validated multi-axis scoring. Get your personalized score and a clear action plan — free, anonymous, no registration required.',
  b: 'Based on the Multi-Axis Assessment framework. Your individual wellness score with actionable next steps — in just 3 minutes, 100% free.',
} as const
