// =============================================
// Growth Quiz Engine - Analytics Event Tracking
// =============================================
// Sends events to GA4, Meta Pixel, and console (dev).

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, unknown>
}

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

const SESSION_KEY = 'quiz_engine_session'
const UTM_KEY = 'quiz_engine_utm'
const START_TIME_KEY = 'quiz_engine_start'

// --- UTM Capture ---

export function captureUTMParams(): UTMParams {
  const stored = sessionStorage.getItem(UTM_KEY)
  if (stored) {
    try {
      return JSON.parse(stored) as UTMParams
    } catch {
      // fall through to re-capture
    }
  }

  const params = new URLSearchParams(window.location.search)
  const utm: UTMParams = {}

  const keys: (keyof UTMParams)[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  for (const key of keys) {
    const value = params.get(key)
    if (value) {
      utm[key] = value
    }
  }

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm))
  }

  return utm
}

export function getUTMParams(): UTMParams {
  const stored = sessionStorage.getItem(UTM_KEY)
  if (stored) {
    try {
      return JSON.parse(stored) as UTMParams
    } catch {
      return {}
    }
  }
  return {}
}

// --- Session ID ---

export function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, sessionId)
  }
  return sessionId
}

// --- Quiz Duration ---

export function markQuizStart(): void {
  if (!sessionStorage.getItem(START_TIME_KEY)) {
    sessionStorage.setItem(START_TIME_KEY, Date.now().toString())
  }
}

export function getQuizDurationSeconds(): number {
  const start = sessionStorage.getItem(START_TIME_KEY)
  if (!start) return 0
  return Math.round((Date.now() - parseInt(start, 10)) / 1000)
}

// --- Device Detection ---

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent
  if (/iPad|Android(?!.*Mobile)/i.test(ua)) return 'tablet'
  if (/iPhone|iPod|Android.*Mobile|webOS|BlackBerry/i.test(ua)) return 'mobile'
  return 'desktop'
}

// --- Core Track Function ---

export function trackEvent(event: string, properties?: Record<string, unknown>): void {
  const enrichedProperties = {
    ...properties,
    session_id: getSessionId(),
    device: getDeviceType(),
    timestamp: new Date().toISOString(),
    ...getUTMParams(),
  }

  if (import.meta.env.DEV) {
    console.info(`[Analytics] ${event}`, enrichedProperties)
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as Record<string, unknown>).gtag as ((...args: unknown[]) => void) | undefined
    gtag?.('event', event, enrichedProperties)
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && 'fbq' in window) {
    const fbq = (window as Record<string, unknown>).fbq as ((...args: unknown[]) => void) | undefined
    if (event === 'email_submit') {
      fbq?.('track', 'Lead', enrichedProperties)
    } else if (event === 'quiz_complete') {
      fbq?.('track', 'ViewContent', enrichedProperties)
    } else {
      fbq?.('trackCustom', event, enrichedProperties)
    }
  }
}

// --- Pre-built Event Helpers ---

export function trackQuizStart(): void {
  markQuizStart()
  trackEvent('quiz_start', {
    referrer: document.referrer,
    url: window.location.href,
    variant: new URLSearchParams(window.location.search).get('variant') ?? 'a',
  })
}

export function trackQuizStep(screen: string, stepNumber: number, totalSteps: number): void {
  trackEvent('quiz_step', {
    screen,
    step_number: stepNumber,
    total_steps: totalSteps,
    quiz_duration: getQuizDurationSeconds(),
  })
}

export function trackEmailGateView(): void {
  trackEvent('email_gate_view', {
    quiz_duration: getQuizDurationSeconds(),
  })
}

export function trackEmailSubmit(hasConsent: boolean): void {
  trackEvent('email_submit', {
    consent_marketing: hasConsent,
    quiz_duration: getQuizDurationSeconds(),
  })
}

export function trackQuizComplete(
  resultType: string,
  phase: string,
  severity: string,
  impactIndex: string
): void {
  trackEvent('quiz_complete', {
    result_type: resultType,
    phase,
    severity,
    impact_index: impactIndex,
    quiz_duration: getQuizDurationSeconds(),
  })
}

export function trackCTAClick(resultType: string): void {
  trackEvent('cta_click', {
    result_type: resultType,
    cta_label: 'get_action_plan',
  })
}

export function trackShareClick(method: 'whatsapp' | 'copy_link'): void {
  trackEvent('share_click', { method })
}

export function trackExitIntent(screen: string, action: 'shown' | 'continued' | 'dismissed'): void {
  trackEvent('exit_intent', { screen, action })
}

// --- Quiz-specific events ---

export function trackReadinessLevel(level: 'high' | 'medium' | 'low'): void {
  trackEvent(level === 'high' ? 'readiness_high' : 'readiness_low', {
    level,
  })
}

export function trackAssessmentStatus(status: string): void {
  trackEvent(status === 'confirmed' ? 'assessment_confirmed' : 'assessment_pending', {
    status,
  })
}

export function trackPostalCodeSubmitted(hasPostalCode: boolean): void {
  if (hasPostalCode) {
    trackEvent('postal_code_submitted')
  }
}

export function trackHeroView(): void {
  trackEvent('hero_view', { url: window.location.href })
}

export function trackScroll50(): void {
  trackEvent('scroll_50', { page: 'hero' })
}
