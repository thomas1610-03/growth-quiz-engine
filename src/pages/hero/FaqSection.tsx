import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const FAQ_ITEMS = [
  {
    q: 'Is the assessment really free?',
    a: 'Yes, completely free. No subscription, no hidden costs, no upsell. You receive your results and your plan without any obligation.',
  },
  {
    q: 'What happens with my data?',
    a: 'Your answers are only used to generate your personal results. We store nothing without your consent. 100% GDPR compliant.',
  },
  {
    q: 'What science is it based on?',
    a: 'The assessment is based on a multi-axis framework that has been validated over 20+ years. It is used in clinical studies and professional settings worldwide.',
  },
  {
    q: 'Who evaluates my answers?',
    a: 'The evaluation is fully automatic based on a scientific scoring system. No human sees your answers \u2013 unless you choose to share them (e.g. with your doctor).',
  },
  {
    q: 'How long does it take?',
    a: 'About 3 minutes. All questions use simple buttons \u2013 no typing required.',
  },
  {
    q: 'Do I get results immediately?',
    a: 'Yes, right after the last question you will see your wellness score, your prioritized concerns, and a concrete action plan. You can also have everything sent to you via email.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. The assessment works entirely without registration, without login, without an account. You can start immediately.',
  },
]

export function FaqSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-5">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-[24px] md:text-[32px] font-bold text-[#2C3E50] mb-3">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Accordion type="multiple" className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#2C3E50]/10 last:border-b-0">
                <AccordionTrigger className="text-[15px] md:text-[16px] font-semibold text-[#2C3E50] py-5 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] leading-[22px] text-[#2C3E50]/65 pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
