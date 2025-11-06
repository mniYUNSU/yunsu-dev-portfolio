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
      className="container flex min-h-[80vh] flex-col justify-center gap-10 py-24"
      {...sectionMotion}
    >
      <div className="flex flex-col gap-6">
        <Badge className="w-fit bg-primary/15 text-primary uppercase tracking-[0.4em]">
          Next.js Lead
        </Badge>
        <div className="flex flex-col gap-4 text-balance">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Shipping rich product experiences with modern web tooling.
          </h1>
          <p className="max-w-2xl text-lg text-foreground/80">
            I&apos;m Yunsu, a senior front-end engineer specializing in performant
            Next.js applications. I weave together design systems, accessibility,
            and animation to build interfaces users love.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="#projects"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition duration-200 hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View Projects
        </Link>
        <Link
          href="https://drive.google.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-5 py-2 text-sm font-medium text-foreground transition duration-200 hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Download Resume
          <ExternalLinkIcon className="size-4" />
        </Link>
      </div>
    </motion.section>
  );
}
