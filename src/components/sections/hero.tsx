"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const sectionMotion = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-15% 0px -15% 0px" },
} satisfies Partial<HTMLMotionProps<"section">>;

const headingVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const subcopyVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12 } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.25 + index * 0.1,
    },
  }),
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/yunsux",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yunsu",
    icon: Linkedin,
  },
] as const;

export function HeroSection() {
  return (
    <motion.section
      id="home"
      className="container grid min-h-[80vh] gap-16 py-20 md:py-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)]"
      {...sectionMotion}
    >
      <div className="flex flex-col justify-center gap-10">
        <motion.div
          variants={headingVariants}
          className="flex flex-col gap-6 text-balance"
        >
          <Badge className="w-fit bg-brand/10 text-small text-brand-600">
            Yunsu Kim · Product-focused Front-end
          </Badge>
          <h1 className="text-h1 text-foreground">
            Senior Front-end Engineer shaping immersive, accessible product
            experiences.
          </h1>
        </motion.div>

        <motion.p
          variants={subcopyVariants}
          className="text-lead max-w-2xl"
        >
          I build resilient customer journeys with React, Next.js, and motion
          systems—bridging design and engineering to launch experiences that feel
          effortless across devices.
        </motion.p>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            {[{
              href: "#projects",
              label: "View My Work",
              className:
                "inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground shadow-soft transition duration-200 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            }, {
              href: "#contact",
              label: "Contact Me",
              className:
                "inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-surface/80 px-5 py-2 text-sm font-semibold text-foreground transition duration-200 hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            }].map((cta, index) => (
              <motion.span
                key={cta.label}
                custom={index}
                variants={ctaVariants}
              >
                <Link href={cta.href} className={cta.className}>
                  {cta.label}
                </Link>
              </motion.span>
            ))}
          </div>

          <motion.div
            variants={ctaVariants}
            custom={2}
            className="flex items-center gap-3"
            aria-label="Social media"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-surface/80 text-neutral-600 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-neutral-200"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={ctaVariants}
        custom={3}
        className="relative mx-auto flex h-72 w-72 items-center justify-center"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-brand/15 via-brand/30 to-brand/10 blur-3xl" />
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] border border-border/50 bg-surface/80 shadow-elevated backdrop-blur">
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface/70 p-10 text-center">
            <span className="rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-small text-brand-600">
              Currently
            </span>
            <p className="text-muted max-w-[12rem]">
              Leading design systems & motion strategy for growth-stage products.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
