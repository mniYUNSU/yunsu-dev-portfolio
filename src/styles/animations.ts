import type { HTMLMotionProps } from "framer-motion";

const MAC_EASE = [0.19, 1, 0.22, 1] as const;

export const sectionMotion = {
  initial: { opacity: 0, y: 42 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15% 0px -15% 0px" },
  transition: { duration: 0.75, ease: MAC_EASE },
} satisfies Partial<HTMLMotionProps<"section">>;

export const heroHeadingVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 26 : 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMdUp ? 0.7 : 0.5, ease: MAC_EASE },
  },
});

export const heroSubcopyVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 22 : 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMdUp ? 0.65 : 0.48, delay: 0.12, ease: MAC_EASE },
  },
});

export const heroCtaVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 20 : 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: isMdUp ? 0.6 : 0.45,
      delay: (isMdUp ? 0.2 : 0.14) + index * (isMdUp ? 0.12 : 0.08),
      ease: MAC_EASE,
    },
  }),
});

export const aboutIntroVariants = (isMdUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 24 : 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMdUp ? 0.65 : 0.5, ease: MAC_EASE },
  },
});

export const aboutStaggerVariants = (isMdUp: boolean, isLgUp: boolean) => ({
  hidden: { opacity: 0, y: isMdUp ? 20 : 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: isMdUp ? 0.55 : 0.4,
      delay: (isMdUp ? 0.18 : 0.12) + index * (isLgUp ? 0.12 : 0.08),
      ease: MAC_EASE,
    },
  }),
});
