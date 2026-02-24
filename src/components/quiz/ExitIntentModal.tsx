import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ExitIntentModalProps {
  show: boolean
  remainingQuestions: number
  onDismiss: () => void
  onContinue: () => void
}

export function ExitIntentModal({
  show,
  remainingQuestions,
  onDismiss,
  onContinue,
}: ExitIntentModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onDismiss}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm"
          >
            <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(44,33,27,0.15)] p-8 relative">
              {/* Close button */}
              <button
                onClick={onDismiss}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EDE3F2] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-[#9CA3AF]" />
              </button>

              <div className="text-center">
                <p className="text-3xl mb-4" aria-hidden="true">{'\u23F3'}</p>
                <h3 className="text-[28px] leading-[32px] font-semibold text-[#2C3E50] mb-3">
                  Almost there!
                </h3>
                <p className="text-[18px] leading-relaxed text-[#4F5D75] mb-6">
                  Your result is just{' '}
                  <span className="text-[#FF6B9D] font-semibold">{remainingQuestions} questions</span>{' '}
                  away.
                </p>
                <button
                  onClick={onContinue}
                  className="w-full h-[52px] rounded-full bg-[#FF6B9D] hover:bg-[#e85a8a] text-white text-[18px] font-semibold transition-colors shadow-[0_4px_12px_rgba(224,122,95,0.3)]"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
