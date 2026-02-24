import { motion } from 'framer-motion'

interface SectionDividerProps {
  color?: 'teal' | 'pink' | 'neutral'
}

const COLORS = {
  teal: 'bg-[#4ECDC4]/20',
  pink: 'bg-[#FF6B9D]/15',
  neutral: 'bg-[#2C3E50]/8',
}

export function SectionDivider({ color = 'neutral' }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="flex justify-center py-1"
    >
      <div className={`h-[2px] w-16 rounded-full ${COLORS[color]}`} />
    </motion.div>
  )
}
