import { motion } from 'framer-motion'
import { Flame, Moon, Brain, Frown, Bone, Scale } from 'lucide-react'

interface PainCardProps {
  icon: React.ReactNode
  title: string
  teaser: string
  delay: number
}

const CONCERNS = [
  { icon: <Flame size={28} />, title: 'Energy & Fatigue', teaser: 'Low energy, persistent tiredness, afternoon crashes' },
  { icon: <Moon size={28} />, title: 'Sleep Quality', teaser: 'Trouble falling asleep, waking up at night' },
  { icon: <Brain size={28} />, title: 'Brain Fog & Focus', teaser: 'Concentration issues, mental fatigue' },
  { icon: <Frown size={28} />, title: 'Stress & Mood', teaser: 'Irritability, anxiety, emotional ups and downs' },
  { icon: <Bone size={28} />, title: 'Physical Comfort', teaser: 'Tension, stiffness, reduced mobility' },
  { icon: <Scale size={28} />, title: 'Weight & Nutrition', teaser: 'Changed body composition, digestive issues' },
]

function PainCard({ icon, title, teaser, delay }: PainCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(44,62,80,0.06)] border border-[#2C3E50]/5 hover:shadow-[0_4px_16px_rgba(44,62,80,0.1)] transition-shadow"
    >
      <div className="w-12 h-12 rounded-xl bg-[#FF6B9D]/10 flex items-center justify-center text-[#FF6B9D] mb-3">
        {icon}
      </div>
      <h3 className="text-[16px] font-semibold text-[#2C3E50] mb-1">{title}</h3>
      <p className="text-[14px] leading-[20px] text-[#2C3E50]/55">{teaser}</p>
    </motion.div>
  )
}

interface PainSectionProps {
  onStart: () => void
}

export function PainSection({ onStart }: PainSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24 px-5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-[24px] md:text-[32px] font-bold text-[#2C3E50] mb-3">
            You're not alone.
          </h2>
          <p className="text-[16px] md:text-[18px] leading-[26px] text-[#2C3E50]/65 max-w-xl mx-auto">
            Many people experience at least one of these concerns &mdash; often more severely than expected.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONCERNS.map((s, i) => (
            <PainCard key={s.title} icon={s.icon} title={s.title} teaser={s.teaser} delay={i * 0.08} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-10 text-center"
        >
          <button
            onClick={onStart}
            className="text-[16px] font-semibold text-[#FF6B9D] hover:text-[#e85a8a] transition-colors underline underline-offset-4 decoration-[#FF6B9D]/30"
          >
            Sound familiar? Find out now &rarr;
          </button>
        </motion.div>
      </div>
    </section>
  )
}
