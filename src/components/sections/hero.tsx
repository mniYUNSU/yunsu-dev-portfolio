"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@/components/ui/external-link-icon";

const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
} satisfies Partial<HTMLMotionProps<"section">>;

export function HeroSection() {
  return (
    <motion.section
      id="home"
      className="container flex min-h-[80vh] flex-col justify-center gap-10 py-20 md:py-28"
      {...sectionMotion}
    >
      <div className="flex flex-col gap-6">
        <Badge className="w-fit bg-brand/10 text-small text-brand-600">
          Next.js Lead
        </Badge>
        <div className="flex flex-col gap-4 text-balance">
          <h1 className="text-h1 text-foreground">
            Shipping rich product experiences with modern web tooling.
          </h1>
          <p className="text-lead max-w-2xl">
            I&apos;m Yunsu, a senior front-end engineer specializing in performant
            Next.js applications. I weave together design systems, accessibility,
            and animation to build interfaces users love.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="#projects"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground shadow-soft transition duration-200 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View Projects
        </Link>
        <Link
          href="https://drive.google.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-surface/80 px-5 py-2 text-sm font-medium text-foreground transition duration-200 hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Download Resume
          <ExternalLinkIcon className="size-4" />
        </Link>
      </div>
    </motion.section>
  );
}
