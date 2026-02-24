// =============================================
// Growth Quiz Engine - Webhook + Email Sending
// =============================================
// 1. Sends quiz results to CRM/webhook endpoint (VITE_WEBHOOK_URL)
// 2. Sends personalized result email via /api/send-email

import type { QuizAnswers, QuizResult } from '@/types'
import { getUTMParams, getSessionId, getQuizDurationSeconds } from './analytics'

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL as string | undefined

interface WebhookPayload {
  first_name: string
  email: string
  phone: string
  postal_code: string
  consent_marketing: boolean
  session_id: string
  quiz_result: {
    result_type: string
    phase: string
    severity: string
    impact_index: string
    readiness_level: string
    phase_score: number
    severity_score: number
    impact_score: number
    total_score: number
    readiness_score: number
    top_concerns: string[]
    recommended_modules: string[]
  }
  // Quiz-specific fields
  assessment_status: string
  current_approach: string
  main_goal: string
  action_readiness: string
  lifecycle_phase: string
  utm: Record<string, string | undefined>
  metadata: {
    timestamp: string
    device: string
    quiz_duration_seconds: number
    locale: string
    referrer: string
  }
}

function getDevice(): string {
  const ua = navigator.userAgent
  if (/iPad|Android(?!.*Mobile)/i.test(ua)) return 'tablet'
  if (/iPhone|iPod|Android.*Mobile/i.test(ua)) return 'mobile'
  return 'desktop'
}

export async function sendEmailWebhook(
  email: string,
  consent: boolean,
  answers: QuizAnswers,
  result: QuizResult
): Promise<boolean> {
  const payload: WebhookPayload = {
    first_name: answers.firstName ?? '',
    email,
    phone: answers.phone ?? '',
    postal_code: answers.postalCode ?? '',
    consent_marketing: consent,
    session_id: getSessionId(),
    quiz_result: {
      result_type: result.resultType,
      phase: result.phase,
      severity: result.severity,
      impact_index: result.impactIndex,
      readiness_level: result.readinessLevel,
      phase_score: result.phaseScore,
      severity_score: result.severityScore,
      impact_score: result.impactScore,
      total_score: result.totalScore,
      readiness_score: result.readinessScore,
      top_concerns: result.topConcerns,
      recommended_modules: result.recommendedModules,
    },
    assessment_status: answers.assessmentStatus ?? '',
    current_approach: answers.currentApproach ?? '',
    main_goal: answers.mainGoal ?? '',
    action_readiness: answers.actionReadiness ?? '',
    lifecycle_phase: answers.lifecyclePhase ?? '',
    utm: getUTMParams() as Record<string, string | undefined>,
    metadata: {
      timestamp: new Date().toISOString(),
      device: getDevice(),
      quiz_duration_seconds: getQuizDurationSeconds(),
      locale: navigator.language,
      referrer: document.referrer,
    },
  }

  // Fire both requests in parallel (non-blocking)
  const promises: Promise<boolean>[] = []

  // 1. CRM Webhook (if configured)
  if (WEBHOOK_URL) {
    promises.push(
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((r) => r.ok)
        .catch(() => false)
    )
  }

  // 2. Email sending via our API endpoint
  promises.push(
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => r.ok)
      .catch(() => {
        if (import.meta.env.DEV) {
          console.info('[Email] /api/send-email not available (dev mode). Payload:', payload)
        }
        return false
      })
  )

  if (import.meta.env.DEV && !WEBHOOK_URL) {
    console.info('[Webhook] Payload:', payload)
  }

  const results = await Promise.all(promises)
  return results.some(Boolean)
}
