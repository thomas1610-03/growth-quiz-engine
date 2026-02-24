import { motion } from 'framer-motion'
import { ClipboardList, BarChart2, Mail } from 'lucide-react'

const STEPS = [
  {
    number: '1',
    icon: <ClipboardList size={24} />,
    title: 'Answer 9 quick questions',
    description: 'Simple visual buttons \u2013 no typing needed. Takes about 3 minutes.',
  },
  {
    number: '2',
    icon: <BarChart2 size={24} />,
    title: 'View your results + score',
    description: 'Your personal assessment score with severity rating \u2013 instantly visible.',
  },
  {
    number: '3',
    icon: <Mail size={24} />,
    title: 'Get your plan via email',
    description: 'Your individual action plan with concrete next steps \u2013 free.',
  },
]

export function StepsSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-5">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-[24px] md:text-[32px] font-bold text-[#2C3E50] mb-3">
            How it works
          </h2>
          <p className="text-[16px] text-[#2C3E50]/60">
            Three steps to your personal plan.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 md:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex items-start gap-5"
            >
              {/* Number circle */}
              <div className="relative shrink-0">
                <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#4ECDC4]/70 flex items-center justify-center text-white shadow-[0_2px_8px_rgba(78,205,196,0.3)]">
                  {step.icon}
                </div>
                {/* Connector dot between steps (not after last) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-full pt-2">
                    <div className="w-1 h-1 rounded-full bg-[#4ECDC4]/40" />
                    <div className="w-1 h-1 rounded-full bg-[#4ECDC4]/30 mt-1" />
                    <div className="w-1 h-1 rounded-full bg-[#4ECDC4]/20 mt-1" />
                  </div>
                )}
              </div>

              <div className="pt-1">
                <p className="text-[11px] font-bold text-[#4ECDC4] uppercase tracking-wider mb-1">
                  Step {step.number}
                </p>
                <h3 className="text-[17px] font-semibold text-[#2C3E50] mb-1">{step.title}</h3>
                <p className="text-[14px] leading-[22px] text-[#2C3E50]/55">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
