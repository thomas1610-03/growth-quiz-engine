import { ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  showBack?: boolean
  onBack?: () => void
  progress?: number
  showProgress?: boolean
  transparent?: boolean
}

export function Header({
  showBack = false,
  onBack,
  progress,
  showProgress = true,
  transparent = false,
}: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 ${transparent ? '' : 'bg-[#F8F1F9]/95 backdrop-blur-sm'}`}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: back button + brand */}
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                transparent
                  ? 'border border-white/30 hover:bg-white/10'
                  : 'border border-[#E2D6EA] hover:bg-[#EDE3F2]'
              }`}
              aria-label="Back"
            >
              <ChevronLeft className={`w-5 h-5 ${transparent ? 'text-white' : 'text-[#2C3E50]'}`} />
            </motion.button>
          )}
        </div>

        {/* Right: spacer for balance */}
        <div className="w-10 h-10" />
      </div>

      {/* Progress bar */}
      {showProgress && progress !== undefined && (
        <div
          className={`h-[3px] ${transparent ? 'bg-white/20' : 'bg-[#E2D6EA]/30'}`}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${progress}%`}
        >
          <motion.div
            className="h-full bg-[#FF6B9D]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      )}
    </header>
  )
}
