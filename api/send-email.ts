import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const RESULT_CONFIGS: Record<string, {
  headline: string
  subtitle: string
  description: string
  actionModules: Array<{ moduleRange: string; title: string; description: string; icon: string }>
  nextStepInfo: string
}> = {
  'mild-concerns': {
    headline: 'Mild Concerns Detected',
    subtitle: 'Your body is sending early signals — and you\'re listening.',
    description: 'Your profile shows mild but noticeable patterns. Early action can prevent concerns from intensifying.',
    actionModules: [
      { moduleRange: 'Module 1–3', title: 'Foundations & Prevention', description: 'Understand what\'s happening and learn evidence-based daily strategies.', icon: '📚' },
      { moduleRange: 'Module 4–6', title: 'Personalized Exercises', description: 'Short daily programs tailored to your specific concern combination.', icon: '🧘' },
    ],
    nextStepInfo: 'Your plan can help you manage concerns early. Get started with your personalized action plan.',
  },
  'moderate-concerns': {
    headline: 'Moderate Concerns',
    subtitle: 'You\'re carrying more than most people see.',
    description: 'Your profile shows noticeable concerns affecting your daily life. The good news: this is exactly the stage where evidence-based interventions are most effective.',
    actionModules: [
      { moduleRange: 'Module 1–3', title: 'Targeted Management', description: 'Focused strategies for your strongest concerns — based on your profile.', icon: '🎯' },
      { moduleRange: 'Module 7–9', title: 'Sleep & Recovery', description: '7-night program: temperature, timing, breathing techniques — tailored for you.', icon: '🌙' },
      { moduleRange: 'SOS Plan', title: 'Quick Relief', description: 'Instant strategies for acute episodes of your top concerns.', icon: '⚡' },
    ],
    nextStepInfo: 'Your personalized plan is ready. A professional can help you get the most out of it.',
  },
  'significant-concerns': {
    headline: 'Significant Concerns',
    subtitle: 'Your concerns are noticeably impacting your life.',
    description: 'Your profile shows considerable impact on your daily life. This is common — and there\'s effective, evidence-based help available.',
    actionModules: [
      { moduleRange: 'Module 1–3', title: 'Intensive Program', description: 'CBT-based techniques proven to reduce symptoms by 40-60%.', icon: '🔥' },
      { moduleRange: 'Module 7–9', title: 'Sleep Intensive', description: 'Adapted sleep program. Measurable improvement in 2-3 weeks.', icon: '🌙' },
      { moduleRange: 'SOS Plan', title: 'Immediate Support', description: '2-minute interventions for acute episodes.', icon: '🆘' },
    ],
    nextStepInfo: 'Given your concern level, professional support is especially valuable.',
  },
}

const CONCERN_LABELS: Record<string, string> = {
  'energy-fatigue': 'Energy & Fatigue',
  'sleep-quality': 'Sleep Quality',
  'stress-mood': 'Stress & Mood',
  'physical-comfort': 'Physical Comfort',
  'focus-clarity': 'Focus & Clarity',
  'nutrition-weight': 'Nutrition & Weight',
}

const PHASE_LABELS: Record<string, string> = {
  early: 'Early Phase', mid: 'Mid Phase', advanced: 'Advanced Phase',
}

const SEVERITY_LABELS: Record<string, string> = {
  mild: 'Mild Concerns', moderate: 'Moderate Concerns', significant: 'Significant Concerns', severe: 'Severe Concerns',
}

interface RequestBody {
  first_name: string
  email: string
  consent_marketing: boolean
  quiz_result: {
    result_type: string
    phase: string
    severity: string
    impact_index: string
    readiness: string
    top_concerns: string[]
    recommended_modules: string[]
  }
}

function generateEmailHtml(payload: RequestBody): string {
  const config = RESULT_CONFIGS[payload.quiz_result.result_type] ?? RESULT_CONFIGS['moderate-concerns']
  const phaseLabel = PHASE_LABELS[payload.quiz_result.phase] ?? payload.quiz_result.phase
  const severityLabel = SEVERITY_LABELS[payload.quiz_result.severity] ?? payload.quiz_result.severity
  const greeting = payload.first_name ? `Hi ${payload.first_name}` : 'Hi there'

  const concernChips = payload.quiz_result.top_concerns
    .map((s: string) => CONCERN_LABELS[s] ?? s)
    .map((label: string) =>
      `<span style="display:inline-block;background:#FAF4EC;color:#2D3142;font-size:13px;font-weight:500;padding:4px 12px;border-radius:20px;margin:3px 4px 3px 0;">${label}</span>`
    ).join('')

  const moduleRows = config.actionModules.map((mod) => `
    <tr><td style="padding:12px 16px;background:#fff;border-radius:12px;border-left:3px solid rgba(224,122,95,0.3);">
      <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td width="32" valign="top" style="font-size:20px;padding-right:12px;">${mod.icon}</td>
        <td>
          <p style="margin:0;font-size:11px;font-weight:600;color:#E07A5F;">${mod.moduleRange}</p>
          <p style="margin:2px 0 4px;font-size:15px;font-weight:600;color:#2D3142;">${mod.title}</p>
          <p style="margin:0;font-size:13px;line-height:1.5;color:#4F5D75;">${mod.description}</p>
        </td>
      </tr></table>
    </td></tr><tr><td height="8"></td></tr>`).join('')

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your Personalized Plan</title>
<style>body,table,td{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}body{margin:0;padding:0;background:#F5EDE4;}</style>
</head><body style="margin:0;padding:0;background:#F5EDE4;">
<div style="display:none;max-height:0;overflow:hidden;">${greeting}, your results: ${config.headline}</div>
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5EDE4;"><tr><td align="center" style="padding:24px 16px;">
<table cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">
  <tr><td style="background:#2D3142;border-radius:20px 20px 0 0;padding:40px 32px 32px;">
    <p style="margin:0 0 16px;font-size:17px;color:rgba(255,255,255,0.7);">${greeting},</p>
    <p style="margin:0 0 16px;"><span style="display:inline-block;background:rgba(255,255,255,0.1);color:#E07A5F;font-size:13px;font-weight:600;padding:6px 16px;border-radius:20px;">Your Results</span></p>
    <h1 style="margin:0 0 12px;font-size:32px;line-height:38px;font-weight:700;color:#fff;">${config.headline}</h1>
    <p style="margin:0 0 20px;font-size:17px;line-height:26px;color:rgba(255,255,255,0.7);">${config.subtitle}</p>
    <p style="margin:0 0 24px;">
      <span style="display:inline-block;background:rgba(224,122,95,0.2);color:#E07A5F;font-size:13px;font-weight:500;padding:6px 14px;border-radius:20px;margin-right:8px;">${phaseLabel}</span>
      <span style="display:inline-block;background:rgba(129,178,154,0.2);color:#81B29A;font-size:13px;font-weight:500;padding:6px 14px;border-radius:20px;">${severityLabel}</span>
    </p>
    <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center">
      <a href="#" target="_blank" style="display:block;max-width:400px;background:#E07A5F;color:#fff;text-align:center;font-size:17px;font-weight:600;padding:16px 24px;border-radius:28px;text-decoration:none;">Get Your Personalized Plan</a>
    </td></tr></table>
  </td></tr>
  <tr><td style="background:#FAF4EC;padding:32px;border-radius:0 0 20px 20px;">
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4F5D75;">${config.description}</p>
    ${concernChips ? `<h3 style="margin:0 0 12px;font-size:18px;font-weight:600;color:#2D3142;">Your Top Concerns</h3><p style="margin:0 0 24px;line-height:2;">${concernChips}</p>` : ''}
    <h3 style="margin:0 0 12px;font-size:18px;font-weight:600;color:#2D3142;">Your Personalized Action Plan</h3>
    <table cellpadding="0" cellspacing="0" border="0" width="100%">${moduleRows}</table>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
      <tr><td style="background:rgba(129,178,154,0.1);border:1px solid rgba(129,178,154,0.3);border-radius:12px;padding:16px;">
        <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#2D3142;">Next Steps</p>
        <p style="margin:0;font-size:13px;line-height:1.5;color:#4F5D75;">${config.nextStepInfo}</p>
      </td></tr>
    </table>
    <hr style="border:none;border-top:1px solid #E5D9CC;margin:32px 0 20px;">
    <p style="margin:0 0 24px;font-size:12px;line-height:1.5;color:#9CA3AF;border-left:2px solid #E5D9CC;padding-left:12px;">This assessment is for informational purposes only and does not replace professional advice. Please consult a qualified professional for personalized guidance.</p>
    <p style="margin:0;text-align:center;font-size:11px;color:#9CA3AF;">Growth Quiz Engine</p>
  </td></tr>
</table>
</td></tr></table></body></html>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured')
    return res.status(500).json({ error: 'Email service not configured' })
  }

  const body = req.body as RequestBody
  if (!body.email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const resend = new Resend(apiKey)
  const html = generateEmailHtml(body)
  const resultHeadline = RESULT_CONFIGS[body.quiz_result.result_type]?.headline ?? 'Your Results'

  try {
    const { error } = await resend.emails.send({
      from: 'Quiz Results <noreply@yourdomain.com>',
      to: body.email,
      subject: `Your Results: ${resultHeadline}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Send email error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
