import { type RefObject } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { ABVariant } from '@/types'
import { AB_TITLES } from '@/lib/constants'

interface HeroSectionProps {
  onStart: () => void
  variant: ABVariant
  sectionRef: RefObject<HTMLElement | null>
}

const TRUST_ITEMS = [
  'Validated Assessment',
  '2,000+ tested',
  'GDPR compliant',
]

const textShadow = '0 2px 8px rgba(0,0,0,0.4)'

export function HeroSection({ onStart, variant, sectionRef }: HeroSectionProps) {
  return (
    <section ref={sectionRef} className="relative h-screen min-h-screen overflow-hidden">
      {/* Background images – responsive via CSS */}
      <div className="absolute inset-0">
        {/* Mobile image (default) */}
        <img
          src="/images/hero-mobile.png"
          alt=""
          className="md:hidden w-full h-full object-cover"
          style={{ objectPosition: '50% 15%' }}
        />
        {/* Desktop image */}
        <img
          src="/images/hero-desktop.png"
          alt=""
          className="hidden md:block w-full h-full object-cover"
        />
      </div>

      {/* Overlay – mobile: starts in lower third for seamless image-text / desktop: left-heavy */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 35%, rgba(44,62,80,0.4) 55%, rgba(44,62,80,0.82) 75%, rgba(44,62,80,0.92) 100%)',
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
        className="hidden md:block absolute z-10"
        style={{ left: '5%', top: '50%', transform: 'translateY(-50%)', maxWidth: '45%' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <span
            className="inline-block text-[12px] font-bold text-white/90 backdrop-blur-sm rounded-[20px] uppercase"
            style={{ letterSpacing: '2px', background: 'rgba(255,255,255,0.15)', padding: '6px 16px' }}
          >
            Scientifically Validated
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-[48px] leading-[1.15] font-bold tracking-tight text-white mt-5"
          style={{ textShadow }}
        >
          {AB_TITLES[variant]}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-[20px] leading-[30px] text-white/85 mt-4"
          style={{ textShadow }}
        >
          Multi-Axis Assessment &mdash; your score + clear plan.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="mt-7 h-[56px] rounded-[30px] bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[18px] font-semibold px-8 shadow-[0_6px_24px_rgba(255,107,157,0.35)] flex items-center gap-2 transition-transform duration-200"
        >
          Start Free Assessment
          <ChevronRight size={20} strokeWidth={2.5} />
        </motion.button>

        {/* Trust Bar – horizontal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-4 flex items-center gap-x-4"
        >
          {TRUST_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center gap-x-4">
              <span className="text-[14px]" style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                &#10003; {item}
              </span>
              {i < TRUST_ITEMS.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ===== MOBILE content (centered, anchored to bottom) ===== */}
      <div
        className="md:hidden absolute z-10"
        style={{ bottom: '4%', left: '50%', transform: 'translateX(-50%)', width: '100%' }}
      >
        <div className="text-center px-5">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-3"
          >
            <span
              className="inline-block text-[12px] font-bold text-white/90 backdrop-blur-sm rounded-[20px] uppercase"
              style={{ letterSpacing: '2px', background: 'rgba(255,255,255,0.15)', padding: '6px 16px' }}
            >
              Scientifically Validated
            </span>
          </motion.div>

          {/* Headline – mobile-specific shorter text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-[26px] leading-[1.15] font-bold tracking-tight text-white mt-3"
            style={{ textShadow }}
          >
            Wellness check &mdash; assess your score in 3&nbsp;minutes
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[14px] leading-[20px] text-white/85 mt-[10px]"
            style={{ textShadow }}
          >
            Multi-Axis Assessment &mdash; your score +&nbsp;clear&nbsp;plan.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="mt-5 w-[90%] mx-auto rounded-[30px] bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[16px] font-semibold py-[14px] px-7 shadow-[0_6px_24px_rgba(255,107,157,0.35)] flex items-center justify-center gap-2 transition-transform duration-200"
          >
            Start Free Assessment &rarr;
          </motion.button>

          {/* Trust Bar – condensed single line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="mt-3 flex items-center justify-center"
          >
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.75)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
              &#10003; Validated &middot; &#10003; 2,000+ tested &middot; &#10003; GDPR
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
