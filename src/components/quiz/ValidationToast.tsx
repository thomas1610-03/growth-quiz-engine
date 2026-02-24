import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ValidationToastProps {
  show: boolean
  duration?: number
  onHide?: () => void
}

export function ValidationToast({
  show,
  duration = 1500,
  onHide,
}: ValidationToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onHide?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onHide])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-[#4ECDC4] text-white px-5 py-3 rounded-2xl shadow-[0_4px_12px_rgba(44,33,27,0.12)] flex items-center gap-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-[14px] font-medium">Noted</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
