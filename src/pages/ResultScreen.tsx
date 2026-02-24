import { useEffect, useMemo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Share2, Link as LinkIcon, ChevronDown, FileText, Shield, CheckCircle } from 'lucide-react'
import { useQuiz } from '@/context/QuizContext'
import { calculateResult } from '@/lib/scoring'
import { getResultConfig, PHASE_LABELS, SEVERITY_LABELS, IMPACT_INDEX_LABELS } from '@/lib/results'
import { CONCERN_LABELS } from '@/lib/questions'
import { trackQuizComplete, trackCTAClick, trackShareClick } from '@/lib/analytics'
import { BRAND } from '@/lib/constants'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
}

export function ResultScreen() {
  const { state, goToScreen } = useQuiz()
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => calculateResult(state.answers), [state.answers])
  const config = useMemo(() => getResultConfig(result.resultType), [result.resultType])

  useEffect(() => {
    trackQuizComplete(result.resultType, result.phase, result.severity, result.impactIndex)
  }, [result])

  const totalScoreDisplay = result.totalScore
  const impactPercent = Math.min(100, Math.round((result.totalScore / 44) * 100))

  // Filter recommended modules to exclude those already in actionModules
  const existingModuleRanges = config.actionModules.map(m => m.moduleRange)
  const filteredRecommended = result.recommendedModules.filter(mod =>
    !existingModuleRanges.some(range => mod.startsWith(range))
  )

  const handlePrimaryCTA = useCallback(() => {
    trackCTAClick(result.resultType)
    goToScreen('thank-you')
  }, [result.resultType, goToScreen])

  const handleCopyLink = () => {
    trackShareClick('copy_link')
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    trackShareClick('whatsapp')
    const text = encodeURIComponent(
      'I just took this wellness assessment. Try it too: ' +
        window.location.href
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const isNoConcerns = result.resultType === 'no-concerns'

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8F1F9]"
    >
      {/* HERO SECTION */}
      <div className="bg-gradient-to-b from-[#2C3E50] via-[#2C3E50] to-[#3D4156] text-white rounded-b-[28px]">
        <div className="max-w-[520px] w-full mx-auto px-5 pt-6 md:pt-8 pb-8 md:pb-10">

          {/* Overline */}
          <motion.p
            {...fadeUp}
            className="text-[11px] uppercase font-bold tracking-[2px] text-[#4ECDC4] mb-2"
          >
            Your Wellness Profile
          </motion.p>

          {/* Empathy headline */}
          <motion.h1
            {...fadeUp}
            className="text-[20px] md:text-[24px] leading-[1.3] font-bold text-white max-w-[90%]"
          >
            {config.subtitle}
          </motion.h1>

          {/* Profile info – plain text */}
          <motion.div {...fadeUp} className="mt-3">
            <p className="text-[13px] text-white/70">
              {PHASE_LABELS[result.phase]} &middot; {SEVERITY_LABELS[result.severity]}
            </p>
            <p className="text-[15px] font-bold text-[#4ECDC4] mt-1">
              Assessment Score: {totalScoreDisplay}/44
            </p>
          </motion.div>

          {/* Score bar with marker */}
          <motion.div {...fadeUp} className="mt-2 w-[90%]">
            <div className="flex justify-between text-[11px] text-white/50 mb-1">
              <span>Severity</span>
              <span>{IMPACT_INDEX_LABELS[result.impactIndex]}</span>
            </div>
            <div className="relative h-1.5 bg-white/10 rounded-full overflow-visible">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF6B9D] to-[#F4A261] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${impactPercent}%` }}
                transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_6px_rgba(0,0,0,0.3)] border-2 border-[#F4A261]"
                initial={{ left: 0 }}
                animate={{ left: `${impactPercent}%` }}
                transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                style={{ marginLeft: '-6px' }}
              />
            </div>
          </motion.div>

          {/* Email confirmation line */}
          {state.answers.email && (
            <motion.div
              {...fadeUp}
              className="mt-4 text-[13px] text-[#4ECDC4]/80 flex items-start gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>
                Your plan + report have been sent to<br />
                {state.answers.email}
              </span>
            </motion.div>
          )}

          {/* PRIMARY CTA – navigates to thank-you page */}
          {!isNoConcerns && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-5 w-[90%]"
            >
              <motion.button
                onClick={handlePrimaryCTA}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[16px] font-semibold shadow-[0_6px_24px_rgba(255,107,157,0.35)]"
              >
                Start your plan in the app &rarr;
              </motion.button>
              <p className="text-[13px] text-white/50 mt-2">
                Download the app and activate your personal plan with the code from your email.
              </p>
            </motion.div>
          )}

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center mt-4"
          >
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
              <ChevronDown className="w-5 h-5 text-white/25" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="max-w-[520px] w-full mx-auto px-5 py-8">
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[15px] leading-relaxed text-[#4F5D75] mb-8"
        >
          {config.description}
        </motion.p>

        {/* Concern chips – only if concerns exist */}
        {result.topConcerns.length > 0 && !isNoConcerns && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-[18px] font-semibold text-[#2C3E50] mb-4">Your strongest concerns</h3>
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(44,33,27,0.08)]">
              <div className="flex flex-wrap gap-2">
                {(state.answers.primaryConcerns ?? []).map((concernId) => {
                  const label = CONCERN_LABELS[concernId]
                  if (!label) return null
                  return (
                    <span
                      key={concernId}
                      className="inline-flex items-center bg-[#F8F1F9] rounded-full px-3 py-1.5 text-[13px] font-medium text-[#2C3E50]"
                    >
                      {label}
                    </span>
                  )
                })}
              </div>
              <p className="text-[13px] text-[#9CA3AF] mt-3">
                This combination is common for the {PHASE_LABELS[result.phase]} stage. You are not alone.
              </p>
            </div>
          </motion.div>
        )}

        {/* Action Modules - personalized plan – only if modules exist */}
        {config.actionModules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[18px] font-semibold text-[#2C3E50] mb-4">Your personalized action plan</h3>
            <div className="space-y-3 mb-8">
              {config.actionModules.map((mod, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-4 flex gap-3.5 shadow-[0_2px_8px_rgba(44,33,27,0.08)] border-l-2 border-l-[#FF6B9D]/30"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{mod.icon}</span>
                  <div>
                    <p className="text-[12px] font-medium text-[#FF6B9D] mb-0.5">{mod.moduleRange}</p>
                    <p className="font-semibold text-[15px] text-[#2C3E50] mb-1">{mod.title}</p>
                    <p className="text-[13px] leading-relaxed text-[#4F5D75]">{mod.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* Dynamic recommended modules – deduplicated */}
              {filteredRecommended.length > 0 && (
                <div className="bg-[#F8F1F9] rounded-xl p-4 border border-[#E2D6EA]">
                  <p className="text-[13px] font-medium text-[#2C3E50] mb-2">Additionally recommended based on your profile:</p>
                  <ul className="space-y-1">
                    {filteredRecommended.map((mod, i) => (
                      <li key={i} className="text-[13px] text-[#4F5D75] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4] flex-shrink-0" />
                        {mod}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Next Step Info Box – only if not "no concerns" */}
        {!isNoConcerns && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 rounded-2xl p-5 mb-8"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-semibold text-[#2C3E50] mb-1">
                  Covered by professional guidance
                </h4>
                <p className="text-[13px] leading-relaxed text-[#4F5D75] mb-3">
                  {config.nextStepInfo}
                </p>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#4ECDC4]" />
                  <span className="text-[13px] font-medium text-[#4ECDC4]">
                    Report included with your plan
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Share */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-[#E2D6EA] pt-6 mb-6"
        >
          <p className="text-center text-[14px] text-[#4F5D75] mb-3">
            Know someone who could benefit from this assessment?
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-[14px] font-medium hover:opacity-90 transition-opacity min-h-[44px]"
            >
              <Share2 className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-[#E2D6EA] text-[#4F5D75] text-[14px] font-medium hover:bg-[#EDE3F2] transition-colors min-h-[44px]"
            >
              <LinkIcon className="w-4 h-4" />
              {copied ? 'Link copied!' : 'Copy link'}
            </button>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="border-l-2 border-[#E2D6EA] pl-4 py-1 mb-6">
          <p className="text-xs leading-relaxed text-[#9CA3AF]">
            This quiz does not replace professional medical advice.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 pb-2 opacity-40">
          <img src={BRAND.appIconPath} alt="App" className="w-5 h-5 rounded-md" />
          <span className="text-[11px] text-[#9CA3AF] font-medium">QuizFlow &middot; Your Company</span>
        </div>
      </div>
    </motion.div>
  )
}
