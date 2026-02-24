import { motion } from 'framer-motion'
import { Interstitial } from '@/components/quiz/Interstitial'
import { useQuiz } from '@/context/QuizContext'

export function Interstitial1() {
  const { goToScreen } = useQuiz()

  return (
    <Interstitial
      desktopImage="/images/pain-desktop.png"
      mobileImage="/images/pain-mobile.png"
      onContinue={() => goToScreen('q5-approach')}
    >
      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-[26px] md:text-[42px] font-bold text-white leading-[1.2] mb-3"
      >
        You're not alone.
      </motion.h2>

      {/* Paragraph 1 */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-[15px] md:text-[18px] leading-[1.5] mt-2 md:mt-4"
        style={{ color: 'rgba(255,255,255,0.85)' }}
      >
        Millions of people deal with similar concerns
        <br className="hidden md:inline" />{' '}
        &mdash; yet 80% suffer in silence.
      </motion.p>

      {/* Paragraph 2 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="mt-2 md:mt-3"
      >
        <p
          className="text-[15px] md:text-[18px] leading-[1.5]"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          Taking this assessment shows:
        </p>
        <p className="font-bold text-white text-[16px] md:text-[18px] mt-1.5">
          You're taking yourself seriously.
        </p>
      </motion.div>

      {/* Paragraph 3 */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-[15px] md:text-[18px] leading-[1.5] mt-2 md:mt-4"
        style={{ color: 'rgba(255,255,255,0.85)' }}
      >
        Let's find out together what can help you.
      </motion.p>
    </Interstitial>
  )
}
