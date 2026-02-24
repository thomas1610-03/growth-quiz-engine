import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SliderQuestionProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  labelLeft?: string
  labelRight?: string
}

export function SliderQuestion({
  value,
  onChange,
  min = 1,
  max = 10,
  labelLeft = '1 \u2013 Barely noticeable',
  labelRight = '10 \u2013 Completely changed',
}: SliderQuestionProps) {
  const [isDragging, setIsDragging] = useState(false)

  const percentage = ((value - min) / (max - min)) * 100

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10)
      onChange(newValue)
      if (navigator.vibrate) {
        navigator.vibrate(5)
      }
    },
    [onChange]
  )

  return (
    <div className="py-4">
      {/* Large centered value display */}
      <div className="text-center mb-8">
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="inline-block text-[56px] leading-none font-bold text-[#FF6B9D] tabular-nums"
        >
          {value}
        </motion.span>
        <span className="text-[20px] text-[#9CA3AF] font-medium ml-1">/ {max}</span>
      </div>

      {/* Floating tooltip during drag */}
      <div className="relative mb-2 h-8">
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className="absolute -translate-x-1/2"
              style={{ left: `${percentage}%` }}
            >
              <div className="bg-[#FF6B9D] text-white text-[16px] font-bold rounded-lg px-3 py-1.5 shadow-[0_4px_12px_rgba(44,33,27,0.12)] tabular-nums">
                {value}
              </div>
              <div className="w-2 h-2 bg-[#FF6B9D] rotate-45 mx-auto -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom slider track */}
      <div className="relative">
        {/* Background track */}
        <div className="h-3 bg-[#E2D6EA]/50 rounded-full" />

        {/* Fill track */}
        <motion.div
          className="absolute top-0 left-0 h-3 bg-[#FF6B9D] rounded-full"
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />

        {/* Native range input (invisible, on top for accessibility) */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer"
          aria-label="Impact level"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />

        {/* Custom thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-[3px] border-[#FF6B9D] shadow-[0_2px_8px_rgba(44,33,27,0.15)] pointer-events-none"
          animate={{ left: `calc(${percentage}% - 14px)` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-3">
        <span className="text-[13px] text-[#9CA3AF]">{labelLeft}</span>
        <span className="text-[13px] text-[#9CA3AF]">{labelRight}</span>
      </div>
    </div>
  )
}
