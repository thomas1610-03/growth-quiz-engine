import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface OptionCardProps {
  id: string
  label: string
  description?: string
  emoji?: string
  selected: boolean
  onSelect: () => void
  multiSelect?: boolean
  large?: boolean
}

export function OptionCard({
  label,
  description,
  emoji,
  selected,
  onSelect,
  multiSelect = false,
  large = false,
}: OptionCardProps) {
  const handleSelect = () => {
    onSelect()
  }

  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={selected ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      onClick={handleSelect}
      className={`
        w-full flex items-center gap-3.5
        ${large ? 'py-4 px-4' : 'py-3.5 px-4'}
        rounded-2xl border-2 text-left
        transition-all duration-200
        min-h-[48px]
        ${selected
          ? 'border-[#FF6B9D] bg-[#FFF0F5] shadow-[0_4px_12px_rgba(44,33,27,0.1)]'
          : 'border-[#E2D6EA] bg-white hover:border-[#FF6B9D]/40 shadow-[0_1px_3px_rgba(44,33,27,0.06)]'
        }
      `}
    >
      {/* Emoji */}
      {emoji && (
        <span className="flex-shrink-0 text-[22px] leading-none">{emoji}</span>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-[#2C3E50] ${large ? 'text-[17px] leading-snug' : 'text-[15px] leading-snug'}`}>
          {label}
        </p>
        {description && (
          <p className="text-[13px] text-[#9CA3AF] mt-0.5 leading-snug">{description}</p>
        )}
      </div>

      {/* Radio / Checkbox indicator */}
      <div
        className={`
          flex-shrink-0 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${selected
            ? multiSelect
              ? 'border-[#4ECDC4] bg-[#4ECDC4]'
              : 'border-[#FF6B9D] bg-[#FF6B9D]'
            : 'border-[#D1C8BD]'
          }
        `}
      >
        {selected && multiSelect && <Check className="w-3 h-3 text-white" />}
        {selected && !multiSelect && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </motion.button>
  )
}
