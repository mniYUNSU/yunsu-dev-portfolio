"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="container grid gap-8 py-20 md:grid-cols-[1.2fr_1fr] md:items-start md:py-28"
      {...sectionMotion}
    >
      <div className="space-y-5">
        <SectionTitle>Building delightful experiences</SectionTitle>
        <p className="text-muted">
          Over the last 8+ years, I&apos;ve partnered with design, product, and
          platform teams to bring ambitious ideas to life. I lead with empathy,
          iterate quickly, and obsess over the details that keep interfaces fast,
          resilient, and accessible.
        </p>
        <p className="text-muted">
          My toolkit centers around TypeScript, React, and Next.js, layered with
          Tailwind, design tokens, and progressive enhancement. I enjoy
          architecting UI systems that scale across teams, and mentoring fellow
          engineers along the way.
        </p>
      </div>
      <Card className="flex flex-col gap-6 p-6">
        <div>
          <p className="text-small text-neutral-500">
            Currently crafting
          </p>
          <p className="mt-2 text-h3 text-foreground">
            Senior Front-end Engineer @ Product Studio
          </p>
        </div>
        <ul className="space-y-3 text-muted">
          <li>- Leading the migration to the App Router and React Server Components.</li>
          <li>- Scaling a component library shared across 5 product teams.</li>
          <li>- Coaching engineers on animation and accessibility best practices.</li>
        </ul>
      </Card>
    </motion.section>
  );
}
