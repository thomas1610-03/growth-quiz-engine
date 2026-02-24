import { type RefObject } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const TRUST_ITEMS = [
  'Based on Multi-Axis Assessment',
  '2,000+ participants',
  '100% GDPR compliant',
]

interface FinalCtaSectionProps {
  onStart: () => void
  sectionRef: RefObject<HTMLElement | null>
}

export function FinalCtaSection({ onStart, sectionRef }: FinalCtaSectionProps) {
  return (
    <section ref={sectionRef} id="quiz-cta" className="bg-gradient-to-br from-[#F8F1F9] to-white py-16 md:py-24 px-5">
      <div className="max-w-xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[24px] md:text-[32px] font-bold text-[#2C3E50] mb-4"
        >
          Ready for clarity?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-[16px] text-[#2C3E50]/60 mb-8"
        >
          Start your personal wellness assessment and get your individual action plan.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="mx-auto md:min-w-[340px] rounded-[30px] bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[16px] md:text-[18px] font-semibold px-8 py-4 shadow-[0_4px_20px_rgba(255,107,157,0.3)] flex items-center justify-center gap-2"
        >
          Start Assessment &rarr;
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-[14px] flex items-center justify-center gap-4"
        >
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-[#4ECDC4]" />
              <span className="text-[12px] text-[#2C3E50]/50">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
