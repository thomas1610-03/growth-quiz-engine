import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useQuiz } from '@/context/QuizContext'
import { trackQuizStart } from '@/lib/analytics'
import { useHeroScroll } from '@/hooks/useHeroScroll'
import type { ABVariant } from '@/types'
import {
  HeroSection,
  PainSection,
  ValueSection,
  StepsSection,
  TrustSection,
  FaqSection,
  FinalCtaSection,
  FooterSection,
  StickyCtaBar,
  SectionDivider,
} from './hero'

function getVariant(): ABVariant {
  const params = new URLSearchParams(window.location.search)
  const v = params.get('variant')
  return v === 'b' ? 'b' : 'a'
}

export function HeroLanding() {
  const { goToScreen } = useQuiz()
  const variant = useMemo(getVariant, [])
  const heroSectionRef = useRef<HTMLElement>(null)
  const finalCtaRef = useRef<HTMLElement>(null)
  const { heroInView, finalCtaInView, scroll50SentinelRef } = useHeroScroll({ heroSectionRef, finalCtaRef })

  const handleStart = () => {
    trackQuizStart()
    goToScreen('q1-concerns')
  }

  return (
    <motion.div
      key="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F8F1F9]"
    >
      <HeroSection onStart={handleStart} variant={variant} sectionRef={heroSectionRef} />
      <PainSection onStart={handleStart} />
      <SectionDivider color="teal" />
      <ValueSection />
      <SectionDivider color="neutral" />
      <StepsSection />
      {/* Scroll 50% sentinel */}
      <div ref={scroll50SentinelRef} aria-hidden="true" />
      <SectionDivider color="pink" />
      <TrustSection />
      <SectionDivider color="neutral" />
      <FaqSection />
      <SectionDivider color="teal" />
      <FinalCtaSection onStart={handleStart} sectionRef={finalCtaRef} />
      <FooterSection />

      <StickyCtaBar visible={!heroInView && !finalCtaInView} onStart={handleStart} />
    </motion.div>
  )
}
