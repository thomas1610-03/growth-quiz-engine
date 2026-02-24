import type { Variants, Transition } from 'framer-motion'

// --- Page Transitions (Vertical Fade-Up) ---
export const pageTransition: Transition = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1],
}

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
}

// --- Fade In ---
export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

// --- Slide Up ---
export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
}

// --- Scale Variants (Option Selection) ---
export const scaleVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: {
    scale: 0.96,
    transition: { duration: 0.1 },
  },
  selected: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// --- Staggered Container ---
export const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
}

// --- Interstitial Stagger ---
export const interstitialStagger = {
  headline: { delay: 0.2, duration: 0.5 },
  body: { delay: 0.5, duration: 0.5 },
  button: { delay: 2.0, duration: 0.5 },
}

// --- Progress Bar Spring ---
export const progressSpring: Transition = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
}

// --- Result Page Stagger ---
export const resultStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const resultItemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// --- Button Hover ---
export const buttonHoverVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    boxShadow: '0 4px 12px rgba(224, 122, 95, 0.25)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: {
    y: 0,
    scale: 0.98,
    transition: { duration: 0.1 },
  },
}

// --- Checkmark Stroke Draw ---
export const checkmarkVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.4, ease: 'easeOut' },
      opacity: { duration: 0.1 },
    },
  },
}

// --- Circular Progress ---
export const circularProgressVariants: Variants = {
  initial: { strokeDashoffset: 283 },
  animate: (progress: number) => ({
    strokeDashoffset: 283 - (283 * progress) / 100,
    transition: { duration: 0.5, ease: 'easeOut' },
  }),
}
