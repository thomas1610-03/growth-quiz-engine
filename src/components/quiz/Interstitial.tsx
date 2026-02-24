import { useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface InterstitialProps {
  desktopImage: string
  mobileImage: string
  children: ReactNode
  onContinue: () => void
  buttonLabel?: string
  buttonDelay?: number
}

const textShadow = '0 2px 8px rgba(0,0,0,0.4)'

export function Interstitial({
  desktopImage,
  mobileImage,
  children,
  onContinue,
  buttonLabel = 'Continue',
  buttonDelay = 2000,
}: InterstitialProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), buttonDelay)
    return () => clearTimeout(timer)
  }, [buttonDelay])

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
          src={mobileImage}
          alt=""
          className="md:hidden w-full h-full object-cover"
          style={{ objectPosition: '50% 15%' }}
        />
        <img
          src={desktopImage}
          alt=""
          className="hidden md:block w-full h-full object-cover"
        />
      </div>

      {/* Overlay – mobile: starts in lower third for seamless image-text / desktop: left-heavy */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(44,62,80,0.25) 45%, rgba(44,62,80,0.6) 60%, rgba(44,62,80,0.85) 75%, rgba(44,62,80,0.95) 100%)',
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
          {children}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mt-6"
        >
          {showButton && (
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="h-[56px] rounded-[30px] bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[18px] font-semibold px-8 shadow-[0_6px_24px_rgba(255,107,157,0.35)] flex items-center gap-2 transition-transform duration-200"
            >
              {buttonLabel}
              <ChevronRight size={20} strokeWidth={2.5} />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* ===== MOBILE content (centered, anchored to bottom) ===== */}
      <div
        className="md:hidden absolute z-10"
        style={{ bottom: '8%', left: '50%', transform: 'translateX(-50%)', width: '100%' }}
      >
        <div className="text-center px-5" style={{ textShadow }}>
          {children}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="mt-5 flex justify-center"
        >
          {showButton && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="w-[90%] h-[56px] rounded-[30px] bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[18px] font-semibold px-8 shadow-[0_6px_24px_rgba(255,107,157,0.35)] flex items-center justify-center gap-2 transition-transform duration-200"
            >
              {buttonLabel}
              <ChevronRight size={20} strokeWidth={2.5} />
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
