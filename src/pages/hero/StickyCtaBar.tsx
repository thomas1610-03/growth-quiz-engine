import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface StickyCtaBarProps {
  visible: boolean
  onStart: () => void
}

export function StickyCtaBar({ visible, onStart }: StickyCtaBarProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#2C3E50]/5 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <button
            onClick={onStart}
            className="w-full h-[50px] rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] text-white text-[16px] font-semibold shadow-[0_2px_12px_rgba(255,107,157,0.25)] flex items-center justify-center gap-2"
          >
            Start Assessment
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
