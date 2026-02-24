/**
 * HTML Email Template Generator
 * Generates personalized quiz result emails.
 */

interface EmailData {
  firstName: string
  resultType: string
  headline: string
  subtitle: string
  description: string
  phase: string
  severity: string
  impactIndex: string
  readiness: string
  concerns: string[]
  actionModules: Array<{ moduleRange: string; title: string; description: string; icon: string }>
  nextStepInfo: string
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
  early: 'Early Phase',
  mid: 'Mid Phase',
  advanced: 'Advanced Phase',
}

const SEVERITY_LABELS: Record<string, string> = {
  mild: 'Mild Concerns',
  moderate: 'Moderate Concerns',
  significant: 'Significant Concerns',
  severe: 'Severe Concerns',
}

export function generateEmailHtml(data: EmailData): string {
  const concernChips = data.concerns
    .map((s) => CONCERN_LABELS[s] ?? s)
    .map(
      (label) =>
        `<span style="display:inline-block;background-color:#F8F1F9;color:#2C3E50;font-size:13px;font-weight:500;padding:4px 12px;border-radius:20px;margin:3px 4px 3px 0;">${label}</span>`
    )
    .join('')

  const moduleRows = data.actionModules
    .map(
      (mod) => `
        <tr>
          <td style="padding:12px 16px;background-color:#ffffff;border-radius:12px;border-left:3px solid rgba(224,122,95,0.3);">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="32" valign="top" style="font-size:20px;padding-right:12px;">${mod.icon}</td>
                <td>
                  <p style="margin:0;font-size:11px;font-weight:600;color:#FF6B9D;">${mod.moduleRange}</p>
                  <p style="margin:2px 0 4px;font-size:15px;font-weight:600;color:#2C3E50;">${mod.title}</p>
                  <p style="margin:0;font-size:13px;line-height:1.5;color:#4F5D75;">${mod.description}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td height="8"></td></tr>`
    )
    .join('')

  const phaseLabel = PHASE_LABELS[data.phase] ?? data.phase
  const severityLabel = SEVERITY_LABELS[data.severity] ?? data.severity
  const greeting = data.firstName ? `Hi ${data.firstName}` : 'Hi there'

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your Personalized Plan</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body,table,td{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}
    body{margin:0;padding:0;background-color:#EDE3F2;}
    img{border:0;display:block;outline:none;text-decoration:none;}
    @media only screen and (max-width:600px){
      .wrapper{width:100%!important;padding:0 16px!important;}
      .hero-pad{padding:32px 24px!important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#EDE3F2;">
  <div style="display:none;font-size:1px;color:#EDE3F2;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${greeting}, your results: ${data.headline} &ndash; ${phaseLabel}, ${severityLabel}
  </div>

  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#EDE3F2;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table class="wrapper" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">

          <!-- HERO -->
          <tr>
            <td class="hero-pad" style="background-color:#2C3E50;border-radius:20px 20px 0 0;padding:40px 32px 32px;">
              <!-- Greeting -->
              <p style="margin:0 0 16px;font-size:17px;color:rgba(255,255,255,0.7);">
                ${greeting},
              </p>

              <!-- Badge -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:16px;">
                    <span style="display:inline-block;background-color:rgba(255,255,255,0.1);color:#FF6B9D;font-size:13px;font-weight:600;padding:6px 16px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);">
                      Your Results
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Headline -->
              <h1 style="margin:0 0 12px;font-size:32px;line-height:38px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                ${data.headline}
              </h1>
              <p style="margin:0 0 20px;font-size:17px;line-height:26px;color:rgba(255,255,255,0.7);">
                ${data.subtitle}
              </p>

              <!-- Tags -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:24px;">
                    <span style="display:inline-block;background-color:rgba(224,122,95,0.2);color:#FF6B9D;font-size:13px;font-weight:500;padding:6px 14px;border-radius:20px;margin-right:8px;">
                      ${phaseLabel}
                    </span>
                    <span style="display:inline-block;background-color:rgba(129,178,154,0.2);color:#4ECDC4;font-size:13px;font-weight:500;padding:6px 14px;border-radius:20px;">
                      ${severityLabel}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="#" target="_blank" style="display:block;width:100%;max-width:400px;background-color:#FF6B9D;color:#ffffff;text-align:center;font-size:17px;font-weight:600;padding:16px 24px;border-radius:28px;text-decoration:none;">
                      Get Your Personalized Plan
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:12px;">
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);">
                      Free &ndash; your plan loads automatically
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="background-color:#F8F1F9;padding:32px;border-radius:0 0 20px 20px;">

              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4F5D75;">
                ${data.description}
              </p>

              <!-- Concerns -->
              ${
                data.concerns.length > 0
                  ? `
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom:24px;">
                    <h3 style="margin:0 0 12px;font-size:18px;font-weight:600;color:#2C3E50;">
                      Your Top Concerns
                    </h3>
                    <div style="line-height:2;">
                      ${concernChips}
                    </div>
                  </td>
                </tr>
              </table>`
                  : ''
              }

              <!-- Action Modules -->
              <h3 style="margin:0 0 12px;font-size:18px;font-weight:600;color:#2C3E50;">
                Your Personalized Action Plan
              </h3>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${moduleRows}
              </table>

              <!-- Next Steps Box -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
                <tr>
                  <td style="background-color:rgba(129,178,154,0.1);border:1px solid rgba(129,178,154,0.3);border-radius:12px;padding:16px;">
                    <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#2C3E50;">
                      Next Steps
                    </p>
                    <p style="margin:0;font-size:13px;line-height:1.5;color:#4F5D75;">
                      ${data.nextStepInfo}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Second CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
                <tr>
                  <td align="center">
                    <a href="#" target="_blank" style="display:block;width:100%;max-width:400px;color:#FF6B9D;text-align:center;font-size:17px;font-weight:600;padding:14px 24px;border-radius:28px;text-decoration:none;border:2px solid #FF6B9D;">
                      View Full Action Plan
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:32px;">
                <tr><td style="border-top:1px solid #E2D6EA;"></td></tr>
              </table>

              <!-- Disclaimer -->
              <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#9CA3AF;border-left:2px solid #E2D6EA;padding-left:12px;">
                This assessment is for informational purposes only and does not replace
                professional advice. Please consult a qualified professional for
                personalized guidance.
              </p>

              <!-- Footer -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px;">
                <tr>
                  <td align="center">
                    <p style="margin:0;font-size:11px;color:#9CA3AF;">
                      Growth Quiz Engine
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
