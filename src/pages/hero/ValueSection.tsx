import { motion } from 'framer-motion'
import { BarChart3, ListChecks, Compass } from 'lucide-react'

const VALUES = [
  {
    icon: <BarChart3 size={28} />,
    title: 'Your Exact Wellness Score',
    description: 'Based on a multi-axis framework you receive a score from 0\u201344 that shows how strongly your concerns are affecting you.',
    color: '#4ECDC4',
  },
  {
    icon: <ListChecks size={28} />,
    title: 'Prioritized Top Concerns',
    description: 'Find out which concerns are most pronounced for you \u2013 with individual severity ratings.',
    color: '#FF6B9D',
  },
  {
    icon: <Compass size={28} />,
    title: 'Your Personal Action Plan',
    description: 'Tailored to your score and top concerns \u2013 with concrete immediate steps for your daily life.',
    color: '#4ECDC4',
  },
]

export function ValueSection() {
  return (
    <section className="bg-[#F8F1F9] py-16 md:py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-[24px] md:text-[32px] font-bold text-[#2C3E50] mb-3">
            What you'll get in 3 minutes
          </h2>
          <p className="text-[16px] text-[#2C3E50]/60">
            Three concrete results &mdash; free and instant.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(44,62,80,0.06)] text-center flex flex-col items-center h-full"
            >
              <div
                className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${v.color}15`, color: v.color }}
              >
                {v.icon}
              </div>
              <h3 className="text-[17px] font-semibold text-[#2C3E50] mb-2 shrink-0">{v.title}</h3>
              <p className="text-[14px] leading-[22px] text-[#2C3E50]/60 flex-1">{v.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center text-[14px] text-[#2C3E50]/50 mt-10"
        >
          At the end you'll receive everything via email &mdash; including practical next steps.
        </motion.p>
      </div>
    </section>
  )
}
