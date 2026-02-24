import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface StickyQuestionHeaderProps {
  question: string
  children: React.ReactNode
}

export function StickyQuestionHeader({ question, children }: StickyQuestionHeaderProps) {
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Sentinel element at question position */}
      <div ref={sentinelRef} className="h-0" />

      {/* Sticky mini header */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[52px] left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E2D6EA] py-2 px-4"
          >
            <p className="max-w-[480px] mx-auto px-6 text-[14px] font-medium text-[#2C3E50] truncate">
              {question}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  )
}
