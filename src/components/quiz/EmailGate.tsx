import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface EmailGateData {
  firstName: string
  email: string
  phone: string
  postalCode: string
  consent: boolean
}

interface EmailGateProps {
  onSubmit: (data: EmailGateData) => void
  onBack?: () => void
  progress?: number
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const textShadow = '0 2px 8px rgba(0,0,0,0.4)'

export function EmailGate({ onSubmit }: EmailGateProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [phone] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const isValid = firstName.trim().length > 0 && postalCode.trim().length > 0 && EMAIL_REGEX.test(email)

  const handleSubmit = useCallback(() => {
    setSubmitted(true)
    const newErrors: Record<string, string> = {}

    if (!firstName.trim()) {
      newErrors.firstName = 'Please enter your first name.'
    }
    if (!postalCode.trim()) {
      newErrors.postalCode = 'Please enter your postal code.'
    }
    if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onSubmit({ firstName: firstName.trim(), email, phone, postalCode, consent })
  }, [firstName, email, phone, postalCode, consent, onSubmit])

  const clearError = useCallback((field: string) => {
    if (submitted) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }, [submitted])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen relative flex flex-col"
    >
      {/* Background images – responsive */}
      <div className="absolute inset-0">
        <img
          src="/images/interstitial-mobile.png"
          alt=""
          className="md:hidden w-full h-full object-cover"
          style={{ objectPosition: '50% 15%' }}
        />
        <img
          src="/images/interstitial-desktop.png"
          alt=""
          className="hidden md:block w-full h-full object-cover"
        />
      </div>

      {/* Overlay – mobile: bottom-heavy / desktop: left-heavy */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(44,62,80,0.15) 0%, rgba(44,62,80,0.6) 50%, rgba(44,62,80,0.75) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: 'linear-gradient(to right, rgba(44,62,80,0.65) 0%, rgba(44,62,80,0.2) 50%, transparent 100%)',
        }}
      />

      {/* ===== DESKTOP content (left-aligned, vertically centered) ===== */}
      <div
        className="hidden md:flex flex-col justify-center absolute z-10"
        style={{ left: '5%', top: '50%', transform: 'translateY(-50%)', maxWidth: '50%' }}
      >
        <div style={{ textShadow }}>
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-[38px] font-bold text-white leading-[1.2]"
          >
            Where should we send
            <br />
            your plan?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-[18px] leading-[1.6] mt-4"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Get your personalized action plan
            <br />
            and report free via email.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-5 max-w-[400px] space-y-3"
        >
          {/* First Name */}
          <div>
            <input
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); clearError('firstName') }}
              className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-white/95 backdrop-blur-sm text-[16px] text-[#2C3E50]
                placeholder:text-[#9CA3AF]/60 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:ring-offset-2
                ${errors.firstName ? 'border-[#F4A261]' : 'border-white/30 focus:border-[#FF6B9D]'}`}
            />
            <AnimatePresence>
              {errors.firstName && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-[13px] text-[#F4A261]">{errors.firstName}</motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Postal Code */}
          <div>
            <input
              type="text"
              autoComplete="postal-code"
              placeholder="Your ZIP code"
              value={postalCode}
              onChange={(e) => { setPostalCode(e.target.value); clearError('postalCode') }}
              className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-white/95 backdrop-blur-sm text-[16px] text-[#2C3E50]
                placeholder:text-[#9CA3AF]/60 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:ring-offset-2
                ${errors.postalCode ? 'border-[#F4A261]' : 'border-white/30 focus:border-[#FF6B9D]'}`}
            />
            <AnimatePresence>
              {errors.postalCode && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-[13px] text-[#F4A261]">{errors.postalCode}</motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError('email') }}
              className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-white/95 backdrop-blur-sm text-[16px] text-[#2C3E50]
                placeholder:text-[#9CA3AF]/60 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:ring-offset-2
                ${errors.email ? 'border-[#F4A261]' : 'border-white/30 focus:border-[#FF6B9D]'}`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-[13px] text-[#F4A261]">{errors.email}</motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full h-[56px] rounded-[30px] bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[18px] font-semibold shadow-[0_6px_24px_rgba(255,107,157,0.35)] flex items-center justify-center gap-2 transition-transform duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-4"
          >
            Get free plan via email
            <ChevronRight size={20} strokeWidth={2.5} />
          </motion.button>

          {/* Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer mt-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="flex-shrink-0 w-[18px] h-[18px] mt-[2px] rounded border-white/30 text-[#FF6B9D] focus:ring-[#FF6B9D] accent-[#FF6B9D]"
            />
            <span className="text-[14px] leading-[20px] text-white/85">
              I'd like to receive tips and reminders
            </span>
          </label>

          {/* Disclaimer */}
          <p className="text-[13px] mt-2 text-left" style={{ color: 'rgba(255,255,255,0.5)' }}>
            No spam. Unsubscribe anytime. GDPR compliant.
          </p>
        </motion.div>
      </div>

      {/* ===== MOBILE content (centered, anchored to bottom) ===== */}
      <div
        className="md:hidden absolute z-10"
        style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: '88%' }}
      >
        <div className="text-center" style={{ textShadow }}>
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-[24px] font-bold text-white leading-[1.2]"
          >
            Where should we send your plan?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-[14px] leading-[1.6] mt-3"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Get your personalized action plan and report free via email.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 space-y-3"
        >
          {/* First Name */}
          <div>
            <input
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); clearError('firstName') }}
              className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-white/95 backdrop-blur-sm text-[16px] text-[#2C3E50]
                placeholder:text-[#9CA3AF]/60 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:ring-offset-2
                ${errors.firstName ? 'border-[#F4A261]' : 'border-white/30 focus:border-[#FF6B9D]'}`}
            />
            <AnimatePresence>
              {errors.firstName && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-[13px] text-[#F4A261]">{errors.firstName}</motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Postal Code */}
          <div>
            <input
              type="text"
              autoComplete="postal-code"
              placeholder="Your ZIP code"
              value={postalCode}
              onChange={(e) => { setPostalCode(e.target.value); clearError('postalCode') }}
              className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-white/95 backdrop-blur-sm text-[16px] text-[#2C3E50]
                placeholder:text-[#9CA3AF]/60 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:ring-offset-2
                ${errors.postalCode ? 'border-[#F4A261]' : 'border-white/30 focus:border-[#FF6B9D]'}`}
            />
            <AnimatePresence>
              {errors.postalCode && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-[13px] text-[#F4A261]">{errors.postalCode}</motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError('email') }}
              className={`w-full px-4 py-3.5 rounded-2xl border-2 bg-white/95 backdrop-blur-sm text-[16px] text-[#2C3E50]
                placeholder:text-[#9CA3AF]/60 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:ring-offset-2
                ${errors.email ? 'border-[#F4A261]' : 'border-white/30 focus:border-[#FF6B9D]'}`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-[13px] text-[#F4A261]">{errors.email}</motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full h-[56px] rounded-[30px] bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[16px] font-semibold shadow-[0_6px_24px_rgba(255,107,157,0.35)] flex items-center justify-center gap-2 transition-transform duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-[14px]"
          >
            Get free plan via email
            <ChevronRight size={18} strokeWidth={2.5} />
          </motion.button>

          {/* Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer mt-[10px]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="flex-shrink-0 w-[18px] h-[18px] mt-[2px] rounded border-white/30 text-[#FF6B9D] focus:ring-[#FF6B9D] accent-[#FF6B9D]"
            />
            <span className="text-[13px] leading-[18px] text-white/85 text-left">
              I'd like to receive tips and reminders
            </span>
          </label>

          {/* Disclaimer */}
          <p className="text-[12px] text-left mt-[6px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            No spam. Unsubscribe anytime. GDPR compliant.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
