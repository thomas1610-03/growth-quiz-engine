import { motion } from 'framer-motion'
import { Header } from './Header'

interface QuizLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  microCopy?: string
  onBack?: () => void
  onContinue?: () => void
  continueDisabled?: boolean
  continueText?: string
  showProgress?: boolean
  progressValue?: number
  showHeader?: boolean
  extraPadding?: boolean
  rightContent?: React.ReactNode
}

export function QuizLayout({
  children,
  title,
  subtitle,
  microCopy,
  onBack,
  onContinue,
  continueDisabled = false,
  continueText = 'Continue',
  showProgress = true,
  progressValue = 0,
  showHeader = true,
  rightContent,
}: QuizLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-[#F8F1F9] flex flex-col"
    >
      {showHeader && (
        <Header
          showBack={!!onBack}
          onBack={onBack}
          showProgress={showProgress}
          progress={showProgress ? progressValue : undefined}
        />
      )}

      <main className="flex-1 flex flex-col">
        {/* Content area – vertically centered when short, scrolls when tall */}
        <div className="flex-1 flex flex-col px-4 py-6">
          <div className="max-w-4xl w-full mx-auto my-auto">
            <div className={`${rightContent ? 'grid md:grid-cols-2 gap-8 items-center' : 'flex flex-col items-center'}`}>
              {/* Left: question content */}
              <div className="w-full max-w-[520px]">
                {/* Question header */}
                {title && (
                  <div className="mb-6">
                    <h2 className="text-[24px] md:text-[28px] font-semibold leading-tight text-[#2C3E50]">
                      {title}
                    </h2>
                    {subtitle && (
                      <p className="mt-2 text-[15px] text-[#4F5D75]">{subtitle}</p>
                    )}
                    {microCopy && (
                      <p className="mt-1.5 text-[13px] leading-snug text-[#9CA3AF]">{microCopy}</p>
                    )}
                  </div>
                )}

                {/* Options / Content */}
                <div className="space-y-3">
                  {children}
                </div>
              </div>

              {/* Right: optional image/avatar (desktop only) */}
              {rightContent && (
                <div className="hidden md:flex justify-center items-center">
                  {rightContent}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky continue button */}
        {onContinue && (
          <div className="sticky bottom-0 bg-[#F8F1F9]/95 backdrop-blur-sm border-t border-[#E2D6EA]/40 p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="max-w-md mx-auto">
              <button
                onClick={onContinue}
                disabled={continueDisabled}
                className="w-full py-3.5 rounded-full bg-[#FF6B9D] hover:bg-[#e85a8a] text-white font-semibold text-[16px] transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {continueText}
              </button>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  )
}
