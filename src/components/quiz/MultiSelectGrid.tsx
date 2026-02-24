import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface MultiSelectOption {
  id: string
  label: string
  emoji?: string
}

interface MultiSelectGridProps {
  options: MultiSelectOption[]
  selected: string[]
  onToggle: (id: string) => void
}

export function MultiSelectGrid({ options, selected, onToggle }: MultiSelectGridProps) {
  const isOdd = options.length % 2 !== 0

  const handleToggle = (id: string) => {
    onToggle(id)
  }

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {options.map((option, index) => {
        const isSelected = selected.includes(option.id)
        const isLastOdd = isOdd && index === options.length - 1

        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.25, ease: 'easeOut' as const }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleToggle(option.id)}
            className={`
              ${isLastOdd ? 'col-span-2 max-w-[calc(50%-5px)] justify-self-center w-full' : ''}
              relative flex flex-col items-center justify-center gap-1.5
              py-4 px-2.5 rounded-2xl border-2
              transition-all duration-200 min-h-[80px]
              ${isSelected
                ? 'border-[#FF6B9D] bg-[#FFF0F5] shadow-[0_4px_12px_rgba(44,33,27,0.1)]'
                : 'border-[#E2D6EA] bg-white hover:border-[#FF6B9D]/40 shadow-[0_1px_3px_rgba(44,33,27,0.06)]'
              }
            `}
          >
            {/* Checkmark */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-[#4ECDC4] flex items-center justify-center"
              >
                <Check className="w-2.5 h-2.5 text-white" />
              </motion.div>
            )}

            {option.emoji && (
              <span className="text-[24px] leading-none">{option.emoji}</span>
            )}
            <span className="text-[13px] font-medium text-[#2C3E50] text-center leading-tight">
              {option.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
