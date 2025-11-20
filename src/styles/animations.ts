import type { HTMLMotionProps } from "framer-motion";

const MINIMAL_EASE = [0.25, 0.1, 0.25, 1] as const;

export const sectionMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15% 0px -15% 0px" },
  transition: { duration: 0.45, ease: MINIMAL_EASE },
} satisfies Partial<HTMLMotionProps<"section">>;

export const heroHeadingVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 16 : 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: MINIMAL_EASE },
  },
});

export const heroSubcopyVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 12 : 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.08, ease: MINIMAL_EASE },
  },
});

export const heroCtaVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 10 : 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.12 + index * 0.06,
      ease: MINIMAL_EASE,
    },
  }),
});

export const aboutIntroVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 14 : 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: MINIMAL_EASE },
  },
});

export const aboutStaggerVariants = (isMdUp: boolean, isLgUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 12 : 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.1 + index * (isLgUp ? 0.08 : 0.05),
      ease: MINIMAL_EASE,
    },
  }),
});
