import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Share2, Link as LinkIcon } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useQuiz } from '@/context/QuizContext'
import { trackEvent } from '@/lib/analytics'
import { BRAND } from '@/lib/constants'

const APP_STORE_URL = BRAND.appStoreUrl
const PLAY_STORE_URL = BRAND.playStoreUrl

function capitalize(name: string): string {
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

function getStoreUrl(): string {
  const ua = navigator.userAgent || ''
  if (/android/i.test(ua)) return PLAY_STORE_URL
  return APP_STORE_URL
}

/* --- Inline SVG Store Badges --- */

function AppStoreBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="5" fill="#000" />
      <text x="42" y="14" fill="#fff" fontSize="7" fontFamily="system-ui, sans-serif">Download on the</text>
      <text x="42" y="27" fill="#fff" fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif">App Store</text>
      {/* Apple icon simplified */}
      <g transform="translate(14, 8)" fill="#fff">
        <path d="M10.5 2.5c.6-.7 1-1.7.9-2.5-.9 0-2 .6-2.6 1.3-.5.6-1 1.6-.8 2.5.9.1 1.9-.5 2.5-1.3zM11.4 5.3c-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.7-2.8-.7-1.5 0-2.8.8-3.6 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 1.9-1 2.6-2.1.8-1.2 1.1-2.3 1.2-2.4 0 0-2.2-.9-2.3-3.4 0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.6-1.7-3-1.8z" />
      </g>
    </svg>
  )
}

function GooglePlayBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="40" rx="5" fill="#000" />
      <text x="40" y="14" fill="#ccc" fontSize="6.5" fontFamily="system-ui, sans-serif">GET IT ON</text>
      <text x="40" y="27" fill="#fff" fontSize="11" fontWeight="500" fontFamily="system-ui, sans-serif">Google Play</text>
      {/* Play icon simplified */}
      <g transform="translate(10, 7)">
        <path d="M1 1.5l12 11.5L1 24.5V1.5z" fill="#4ECDC4" />
        <path d="M1 1.5l15 13-3 2.8L1 6.8V1.5z" fill="#FF6B9D" opacity="0.8" />
        <path d="M1 24.5l12-10.6 3 2.8L1 24.5z" fill="#F4A261" opacity="0.8" />
      </g>
    </svg>
  )
}

/* --- Watermark --- */
function BrandWatermark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
      <svg viewBox="0 0 200 200" className="w-[400px] h-[400px] opacity-[0.03]" fill="#2C3E50">
        <path d="M100 20c-8 0-14 4-18 10L42 130c-6 10 0 24 14 24h88c14 0 20-14 14-24L118 30c-4-6-10-10-18-10z" />
        <circle cx="100" cy="55" r="12" />
      </svg>
    </div>
  )
}

/* --- Steps with dashed connector --- */
const STEPS = [
  'Your plan + report are in your inbox',
  'Review the action items and consult a professional if needed',
  'Start implementing your personalized plan',
]

function StepsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="w-full bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(44,33,27,0.08)]"
    >
      <h3 className="text-[16px] font-semibold text-[#2C3E50] mb-5">What happens next?</h3>
      <div className="relative">
        {STEPS.map((text, i) => (
          <div key={i} className="flex items-start gap-3 relative">
            {/* Dashed connector line */}
            {i < STEPS.length - 1 && (
              <div
                className="absolute left-[11px] top-[24px] w-[2px] h-[calc(100%-8px)]"
                style={{ borderLeft: '2px dashed #E2D6EA' }}
              />
            )}
            {/* Number circle */}
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4ECDC4] flex items-center justify-center text-[12px] font-bold text-white relative z-10">
              {i + 1}
            </span>
            <p className={`text-[14px] text-[#4F5D75] ${i < STEPS.length - 1 ? 'pb-5' : ''}`}>
              {text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* --- Social Proof with avatars --- */
function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex items-center justify-center gap-2.5 py-2"
    >
      {/* Avatar circles */}
      <div className="flex -space-x-2">
        {['#F4A261', '#FF6B9D', '#4ECDC4'].map((color, i) => (
          <div
            key={i}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="text-white text-[10px] font-bold">
              {['A', 'M', 'S'][i]}
            </span>
          </div>
        ))}
      </div>
      <span className="text-[13px] md:text-[14px] text-[#4F5D75] font-medium">
        {BRAND.userCount}
      </span>
    </motion.div>
  )
}

/* --- Share Section --- */
function ShareSection() {
  const [copied, setCopied] = useState(false)

  const handleWhatsApp = () => {
    trackEvent('share_click', { method: 'whatsapp' })
    const text = encodeURIComponent(
      'I just took this wellness assessment. Try it too: ' + window.location.href
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const handleCopyLink = useCallback(() => {
    trackEvent('share_click', { method: 'copy_link' })
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="w-full"
    >
      <p className="text-center text-[14px] md:text-[15px] text-[#4F5D75] mb-3">
        Know someone who could benefit from this assessment?
      </p>
      <div className="flex flex-col md:flex-row gap-[10px] md:gap-3 md:justify-center">
        <button
          onClick={handleWhatsApp}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-[14px] font-medium hover:opacity-90 transition-opacity min-h-[44px]"
        >
          <Share2 className="w-4 h-4" />
          WhatsApp
        </button>
        <button
          onClick={handleCopyLink}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-[#E2D6EA] text-[#4F5D75] text-[14px] font-medium hover:bg-[#EDE3F2] transition-colors min-h-[44px]"
        >
          <LinkIcon className="w-4 h-4" />
          {copied ? '\u2713 Link copied!' : 'Copy link'}
        </button>
      </div>
    </motion.div>
  )
}

/* =============================================
   MAIN COMPONENT
   ============================================= */

export function ThankYouPage() {
  const { state } = useQuiz()

  useEffect(() => {
    trackEvent('thank_you_page_view')
  }, [])

  const firstName = capitalize(state.answers.firstName || '')

  return (
    <motion.div
      key="thank-you"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8F1F9] flex flex-col relative"
    >
      {/* Watermark */}
      <BrandWatermark />

      <div className="relative z-10 flex-1 max-w-[520px] w-full mx-auto px-4 md:px-5 py-10 md:py-12 flex flex-col items-center gap-4 md:gap-6">

        {/* --- Success Icon --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="w-20 h-20 rounded-full bg-[#4ECDC4]/15 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#4ECDC4]" />
          </div>
        </motion.div>

        {/* --- Headline --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-[28px] md:text-[36px] leading-[34px] md:leading-[42px] font-bold text-[#2C3E50] mb-3">
            Thank you{firstName ? ', ' : ''}<span className="capitalize">{firstName}</span>!
          </h1>
          <p className="text-[15px] md:text-[16px] leading-[24px] text-[#4F5D75] max-w-[90%] md:max-w-[380px] mx-auto">
            Your personalized action plan and report are on the way to your inbox.
          </p>
          <p className="text-[13px] leading-[18px] text-[#9CA3AF] italic mt-2 max-w-[90%] md:max-w-[340px] mx-auto">
            Check your spam folder if the email doesn't arrive within 2 minutes.
          </p>
        </motion.div>

        {/* --- App Download Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_8px_rgba(44,33,27,0.08)]"
        >
          {/* Logo + Title */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={BRAND.appIconPath}
              alt="App"
              className="w-10 h-10 rounded-xl"
            />
            <h3 className="text-[18px] font-semibold text-[#2C3E50]">
              Download the App
            </h3>
          </div>
          <p className="text-[14px] text-[#4F5D75] mb-5">
            Your plan will load automatically once you open the app.
          </p>

          {/* Store badges */}
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-3 mb-1">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[220px] h-[56px] transition-opacity hover:opacity-80"
              onClick={() => trackEvent('store_click', { store: 'app_store' })}
            >
              <AppStoreBadge className="w-full h-full" />
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[220px] h-[56px] transition-opacity hover:opacity-80"
              onClick={() => trackEvent('store_click', { store: 'google_play' })}
            >
              <GooglePlayBadge className="w-full h-full" />
            </a>
          </div>

          <p className="text-[12px] text-[#9CA3AF] text-center mb-4">
            Free &middot; No subscription needed
          </p>

          {/* QR Code – desktop only */}
          <div className="hidden md:flex items-center justify-center gap-4 py-4 border-t border-[#E2D6EA]/50">
            <div className="w-[80px] h-[80px] rounded-lg bg-white p-1.5 border border-[#E2D6EA]">
              <QRCodeSVG
                value={getStoreUrl()}
                size={68}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#2C3E50"
              />
            </div>
            <p className="text-[13px] text-[#9CA3AF] max-w-[200px]">
              Scan QR code to download the app directly
            </p>
          </div>
        </motion.div>

        {/* --- What Happens Next --- */}
        <StepsCard />

        {/* --- Social Proof --- */}
        <SocialProof />

        {/* --- Share Section --- */}
        <ShareSection />

        {/* --- Footer / Disclaimer --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-auto px-6 pt-4 pb-8 md:pb-2"
        >
          <p className="text-[12px] text-[#9CA3AF] leading-[18px]">
            <span>This quiz does not replace professional medical advice.</span>
          </p>
          <p className="text-[12px] text-[#9CA3AF] leading-[18px] mt-1">
            <span>QuizFlow &middot; Your Company</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
