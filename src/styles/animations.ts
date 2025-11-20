import type { HTMLMotionProps } from "framer-motion";

export const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

export const heroHeadingVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 28 : 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMdUp ? 0.6 : 0.4, ease: [0.16, 1, 0.3, 1] },
  },
});

export const heroSubcopyVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 24 : 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMdUp ? 0.55 : 0.38, delay: 0.12, ease: [0.16, 1, 0.3, 1] },
  },
});

export const heroCtaVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 24 : 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: isMdUp ? 0.45 : 0.3,
      delay: (isMdUp ? 0.25 : 0.18) + index * (isMdUp ? 0.1 : 0.08),
      ease: [0.16, 1, 0.3, 1],
    },
  }),
});

export const aboutIntroVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 26 : 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMdUp ? 0.55 : 0.38, ease: [0.16, 1, 0.3, 1] },
  },
});

export const aboutStaggerVariants = (isMdUp: boolean, isLgUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 22 : 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: isMdUp ? 0.45 : 0.3,
      delay: (isMdUp ? 0.18 : 0.14) + index * (isLgUp ? 0.1 : 0.08),
      ease: [0.16, 1, 0.3, 1],
    },
  }),
});
