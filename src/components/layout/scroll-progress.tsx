"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="bg-primary fixed top-0 left-0 z-50 h-1 origin-[0%_50%]"
    />
  );
}
