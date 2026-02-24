# Customization Guide

This guide covers how to customize every aspect of the quiz engine for your use case.

## Table of Contents

- [Questions](#questions)
- [Scoring Logic](#scoring-logic)
- [Result Personas](#result-personas)
- [Branding & Colors](#branding--colors)
- [Email Templates](#email-templates)
- [Analytics Events](#analytics-events)
- [A/B Testing](#ab-testing)

---

## Questions

Questions are defined in `src/lib/questions.ts`. Each question follows the `QuestionConfig` interface:

```typescript
interface QuestionConfig {
  id: string          // Unique key, maps to QuizAnswers field
  screenId: ScreenId  // Screen identifier for routing
  question: string    // Display text (supports {concern1} placeholders)
  microCopy?: string  // Helper text below the question
  type: 'single' | 'multi' | 'slider' | 'slider-frequency'
  options?: QuestionOption[]
  autoAdvance?: boolean  // Auto-advance on single select
  progress: number       // Progress bar percentage (0-100)
}
```

### Adding a new question

1. **Add the type** in `src/types/index.ts`:
   ```typescript
   export type YourNewField = 'option-a' | 'option-b' | 'option-c'
   ```

2. **Add to QuizAnswers**:
   ```typescript
   export interface QuizAnswers {
     // ... existing fields
     yourNewField?: YourNewField
   }
   ```

3. **Add the screen ID** to the `ScreenId` type and `QUIZ_STEPS` array in `src/context/QuizContext.tsx`

4. **Define the question** in `src/lib/questions.ts`:
   ```typescript
   {
     id: 'yourNewField',
     screenId: 'q-your-new',
     question: 'Your question text?',
     type: 'single',
     autoAdvance: true,
     progress: 50,
     options: [
       { id: 'option-a', label: 'Option A' },
       { id: 'option-b', label: 'Option B' },
     ],
   }
   ```

5. **Create a page component** in `src/pages/` (follow existing patterns)

6. **Register in router** (`src/router/index.tsx`)

### Conditional questions

Questions can be skipped based on previous answers. See the `q3-severity-2` implementation — it's only shown when 2+ concerns are selected. The skip logic lives in `QuizContext.tsx`.

### Question types

| Type | Use Case | Example |
|------|----------|---------|
| `single` | One choice from options | Goal selection |
| `multi` | Multiple selections | Concern picker |
| `slider-frequency` | 0-10 slider + frequency dropdown | Severity rating |

---

## Scoring Logic

The scoring engine (`src/lib/scoring.ts`) uses 4 axes:

### Axis 1: Phase Score (0-10)

Calculated from age group + lifecycle phase. Determines which "phase" the user is in.

```
Phase Score = AGE_PHASE_SCORES[age] + LIFECYCLE_PHASE_SCORES[phase]
```

| Phase | Score Range |
|-------|------------|
| Early | 0-4 |
| Mid | 5-7 |
| Advanced | 8-10 |

### Axis 2: Total Score (0-44)

The main severity metric. Weighted by concern severity and frequency:

```
Score = (severity1 × frequency1_weight) + (severity2 × frequency2_weight) + (remaining × avg × 0.6)
```

Frequency weights: rarely=0.7, several-weekly=1.0, daily=1.3, multiple-daily=1.5

| Severity | Score Range |
|----------|------------|
| None | 0 |
| Mild | 1-10 |
| Moderate | 11-22 |
| Significant | 23-33 |
| Severe | 34-44 |

### Axis 3: Impact Index (0-10)

Raw average of the severity sliders. Simple low/medium/high classification.

### Axis 4: Readiness Score (0-14)

Combines assessment status + action readiness + current approach scores.

| Level | Score Range |
|-------|------------|
| Low | 0-4 |
| Medium | 5-8 |
| High | 9-14 |

### Customizing scoring

To modify thresholds, edit the constants in `scoring.ts`. The scoring functions are pure — they take `QuizAnswers` and return computed values. This makes them easy to test and modify.

---

## Result Personas

Result types are defined in `src/lib/results.ts`. Each severity level maps to a persona:

```typescript
export const RESULT_TYPES: Record<ResultType, ResultTypeConfig> = {
  'moderate-concerns': {
    id: 'moderate-concerns',
    headline: 'Moderate Concerns',
    subtitle: 'Empathy-driven subtitle...',
    description: 'Detailed description...',
    actionModules: [
      {
        moduleRange: 'Module 1-3',
        title: 'Targeted Management',
        description: 'Module description...',
        icon: '🎯',
      },
    ],
    nextStepInfo: 'What to do next...',
  },
}
```

### Module recommendations

The `getRecommendedModules()` function in `scoring.ts` dynamically maps selected concerns to recommended modules. Edit this to match your product's module structure.

---

## Branding & Colors

### Brand config

Edit `src/lib/constants.ts`:

```typescript
export const BRAND = {
  name: 'YourBrand',
  company: 'Your Company Inc.',
  tagline: 'Your tagline.',
  logoPath: '/images/logo.svg',
  appStoreUrl: 'https://apps.apple.com/...',
  playStoreUrl: 'https://play.google.com/...',
}
```

### Color palette

Colors are defined in two places:

1. **Tailwind config** (`tailwind.config.js`) — component-level colors
2. **CSS variables** (`src/index.css`) — shadcn/ui theme tokens

Key colors to customize:

| Token | Current | Purpose |
|-------|---------|---------|
| `primary` | `#FF6B9D` | CTAs, active states |
| `secondary` | `#4ECDC4` | Success, trust indicators |
| `accent` | `#F4A261` | Warnings, highlights |
| `background` | `#F8F1F9` | Page background |
| `text-primary` | `#2C3E50` | Headings |
| `text-body` | `#4F5D75` | Body text |

### Fonts

The default font is Inter (loaded from Google Fonts in `index.html`). Change in `tailwind.config.js` under `fontFamily.sans`.

---

## Email Templates

The email template lives in `api/send-email.ts`. It's a server-side Vercel function that generates HTML email using the quiz results.

To customize:
1. Edit the `generateEmailHtml()` function
2. Modify colors, copy, and structure
3. The template receives the full `RequestBody` payload including all quiz answers and results

### Email provider

The engine uses [Resend](https://resend.com) for email delivery. Set `RESEND_API_KEY` in your environment. To use a different provider, replace the Resend SDK calls in `send-email.ts`.

---

## Analytics Events

Pre-built events in `src/lib/analytics.ts`:

| Event | When |
|-------|------|
| `quiz_start` | User starts the quiz |
| `quiz_step` | Each screen change |
| `email_gate_view` | Email form displayed |
| `email_submit` | Email submitted (→ Meta Lead) |
| `quiz_complete` | Results shown (→ Meta ViewContent) |
| `cta_click` | Primary CTA clicked |
| `share_click` | Share button clicked |
| `exit_intent` | Exit intent modal triggered |

### Adding GA4

Add your GA4 script to `index.html`. The engine automatically calls `gtag('event', ...)` for all events.

### Adding Meta Pixel

Add your Meta Pixel base code to `index.html`. The engine automatically maps:
- `email_submit` → `fbq('track', 'Lead')`
- `quiz_complete` → `fbq('track', 'ViewContent')`
- Other events → `fbq('trackCustom', ...)`

---

## A/B Testing

Built-in A/B testing via URL parameter:

```
https://your-domain.com/?variant=b
```

Variants are defined in `src/lib/constants.ts`:

```typescript
export const AB_TITLES = {
  a: 'Variant A headline',
  b: 'Variant B headline',
}
```

The variant is tracked in analytics events for analysis.

---

## CRM Webhook

When configured via `VITE_WEBHOOK_URL`, the engine sends a POST request with the full quiz payload:

```json
{
  "first_name": "Jane",
  "email": "jane@example.com",
  "consent_marketing": true,
  "session_id": "uuid",
  "quiz_result": {
    "result_type": "moderate-concerns",
    "phase": "mid",
    "severity": "moderate",
    "total_score": 18,
    "top_concerns": ["energy-fatigue", "sleep-quality"],
    "recommended_modules": ["Module 1-3: Energy Boost"]
  },
  "utm": { "utm_source": "google", "utm_campaign": "wellness" },
  "metadata": { "device": "mobile", "quiz_duration_seconds": 180 }
}
```

Use this to sync leads with HubSpot, Klaviyo, Salesforce, or any CRM.
