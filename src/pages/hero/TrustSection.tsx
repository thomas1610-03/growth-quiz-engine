import { motion } from 'framer-motion'
import { Quote, TrendingUp } from 'lucide-react'

export function TrustSection() {
  return (
    <section className="bg-[#F8F1F9] py-16 md:py-24 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_12px_rgba(44,62,80,0.06)] mb-10"
        >
          <Quote size={32} className="text-[#4ECDC4]/30 mb-3" />
          <p className="text-[17px] md:text-[19px] leading-[28px] text-[#2C3E50] font-medium italic mb-4">
            &ldquo;The assessment finally showed me why I've been feeling this way &mdash; and what I can actually do about it.&rdquo;
          </p>
          <p className="text-[14px] text-[#2C3E50]/50">
            &mdash; Anonymous participant, 42
          </p>
        </motion.blockquote>

        {/* References */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10"
        >
          <div className="text-center">
            <p className="text-[13px] font-semibold text-[#2C3E50]/40 uppercase tracking-wider">Validated by</p>
            <p className="text-[15px] font-bold text-[#2C3E50]/70 mt-1">Multi-Axis Framework</p>
          </div>
          <div className="w-px h-8 bg-[#2C3E50]/10 hidden md:block" />
          <div className="text-center">
            <p className="text-[13px] font-semibold text-[#2C3E50]/40 uppercase tracking-wider">Based on</p>
            <p className="text-[15px] font-bold text-[#2C3E50]/70 mt-1">Evidence-Based Methods</p>
          </div>
          <div className="w-px h-8 bg-[#2C3E50]/10 hidden md:block" />
          <div className="text-center">
            <p className="text-[13px] font-semibold text-[#2C3E50]/40 uppercase tracking-wider">Recommended by</p>
            <p className="text-[15px] font-bold text-[#2C3E50]/70 mt-1">Health Professionals</p>
          </div>
        </motion.div>

        {/* Stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-gradient-to-r from-[#4ECDC4]/10 to-[#4ECDC4]/5 border border-[#4ECDC4]/20 rounded-2xl p-6 text-center"
        >
          <TrendingUp size={28} className="text-[#4ECDC4] mx-auto mb-3" />
          <p className="text-[28px] md:text-[36px] font-bold text-[#2C3E50]">92%</p>
          <p className="text-[15px] text-[#2C3E50]/60 mt-1">
            of participants feel clearer and more empowered after their results
          </p>
        </motion.div>
      </div>
    </section>
  )
}
